import { Injectable } from '@angular/core';
import Map from 'esri/Map';
import FeatureLayer from 'esri/layers/FeatureLayer';
import GraphicsLayer from 'esri/layers/GraphicsLayer';
import {HttpModule,Headers,Http, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {Observable}     from 'rxjs/Observable';
export class Hero {
  constructor(
    public id:number,
    public name:string) { }
}
@Injectable()
export class SimpleMapService {
    map: any = null;
    result: any = null;
    locationlist: any = null;
    constructor(private http: Http) {
        this.map = new Map({
             basemap: "streets",
              center: [-117.789, 33.543],
              zoom: 10
        });
    }
    addBloodGroup (groupObj: string) : Observable<Hero>  {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({ groupObj });
        let ob$ =  this.http.post('http://localhost:3200/api/save_address', body, options)
          .map(res => res.json())
          .subscribe(
            data => this.result = data,
            err => this.handleError,
            () => this.closeModal()
        );
     }

     getAllGroupLocations (groupObj: string): Observable<Hero>{
        return  this.http.get('http://localhost:3200/api/get_all_locations')
          .map(res => {var tmp = res.json(); return <Hero> tmp;});
          
     }

     closeModal() {
        document.getElementById('myModal').style.display = "none";
        alert('You location added successfully');
        window.location.reload();
    }

     handleError() {
         
     }

}

@Injectable()
export class AnalysisMapService {
    map: any = null;
    constructor() {
        this.map = new Map({
            basemap: 'dark-gray-vector',
            layers: [
                new GraphicsLayer({
                    id: 'analysisLayer'
                }),
                new FeatureLayer({
                    url: 'https://services.arcgis.com/BG6nSlhZSAWtExvp/arcgis/rest/services/World_Volcanoes/FeatureServer/0',
                    id: 'volcanoesLayer'
                })
            ]
        });
    }
}
