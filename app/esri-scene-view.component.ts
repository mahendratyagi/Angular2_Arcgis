import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
import { SimpleMapService } from './map.service';
import { ViewCoordinationService } from './view-coordination.service';
import Map from 'esri/Map';
import Graphic from 'esri/Graphic';
import Point from 'esri/geometry/Point';
import SimpleMarkerSymbol from 'esri/symbols/SimpleMarkerSymbol';
import MapView from 'esri/views/MapView';
import PopupTemplate from 'esri/PopupTemplate';
import Search from 'esri/widgets/Search';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
export class Hero {
  constructor(
    public id:number,
    public name:string) { }
}
@Component({
    selector: 'esri-scene-view',
    templateUrl: './app/addressmap.html',
    providers: [SimpleMapService]
})
export class EsriSceneViewComponent {
    @Output() viewCreated = new EventEmitter();

    view: any = null;

    public myForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];
     heroes:Hero[];

    constructor(
        private _mapService: SimpleMapService,
        private _viewCoordinationService: ViewCoordinationService,
        private elRef: ElementRef,
        private _fb: FormBuilder
    ) {}

    ngOnInit() {
        this.myForm = this._fb.group({
            fname: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            lname: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            emailadd: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            mobile: ['', [<any>Validators.required, <any>Validators.minLength(10)]],
            lat: ['', [<any>Validators.required, <any>Validators.minLength(10)]],
            long: ['', [<any>Validators.required, <any>Validators.minLength(10)]],
            bgroup: ['', [<any>Validators.required, <any>Validators.minLength(6)]]
            
        });

       this.subcribeToFormChanges();

        this.view =  new MapView({
            container: this.elRef.nativeElement.firstChild,
            map: this._mapService.map,
            zoom: this._viewCoordinationService.zoom,
            center: this._viewCoordinationService.center,
            rotation: this._viewCoordinationService.rotation
        })    

        var searchWidget = new Search({
          view: this.view
        });

        this.view.ui.add(searchWidget, {
          position: "top-right",
          index: 2
        });   
        

        this.view.then(function(view) {
            this.viewCreated.next(view);
        }.bind(this));

        this.view.watch('camera', function(newVal, oldVal, propertyName) {
            this._viewCoordinationService.setValue(newVal, propertyName);
        }.bind(this));

        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName("close")[0];

        
       
        function createSymbol(path, color){
          var markerSymbol = new SimpleMarkerSymbol();
          markerSymbol.path = path;
           markerSymbol.path = path;
          markerSymbol.color = color
          return markerSymbol;
        }

        
        this.view.on("click", function(event) {
        var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
        var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;

        document.getElementById('lat').value=lat;
        document.getElementById('long').value=lon;
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
        }
      });

         
        function addmarker(points, mapObj) {            
            var iconPath = "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z";
            var initColor = "#ce641d";            
            let that = mapObj;            
            Object.keys(points).map((key)=>{ 
                var template = new PopupTemplate({
                    title: points[key].first_name+' '+points[key].last_name,
                    content: "<b>Email:- <b>"+points[key].email+"<br><b>Blood Group:- </b>"+points[key].blood_group+"<br><b>Mobile:- </b>"+points[key].mobile
                });
                var loc = new Point(points[key].longtitude, points[key].latitude);
                that.graphics.add(new Graphic(loc, createSymbol(iconPath, initColor), points[key], template));
            });            
        }
        this._mapService.getAllGroupLocations().subscribe(
                       heroes => {addmarker(heroes, this.view)},
                       error =>  this.errorMessage = <any>error);

    }

     subcribeToFormChanges() {
        const myFormStatusChanges$ = this.myForm.statusChanges;
        const myFormValueChanges$ = this.myForm.valueChanges;
        
        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    save(model: User, isValid: boolean) {
        this.submitted = true;
        model.lat = document.getElementById('lat').value;
        model.long = document.getElementById('long').value;
        this._mapService.addBloodGroup(model);
    }

    syncCamera(delaySync:boolean) {
        if (delaySync) {
            setTimeout(() => {
                this.view.goTo(this._viewCoordinationService.camera, {
                    animate: true
                });
            }, 2000);
        } else {
            this.view.goTo(this._viewCoordinationService.camera, {
                animate: false
            });
        }
    }
}
