System.register(["@angular/core", "./map.service", "./view-coordination.service", "esri/Graphic", "esri/geometry/Point", "esri/symbols/SimpleMarkerSymbol", "esri/views/MapView", "esri/PopupTemplate", "esri/widgets/Search", "@angular/forms"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, map_service_1, view_coordination_service_1, Graphic_1, Point_1, SimpleMarkerSymbol_1, MapView_1, PopupTemplate_1, Search_1, forms_1, Hero, EsriSceneViewComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (map_service_1_1) {
                map_service_1 = map_service_1_1;
            },
            function (view_coordination_service_1_1) {
                view_coordination_service_1 = view_coordination_service_1_1;
            },
            function (Graphic_1_1) {
                Graphic_1 = Graphic_1_1;
            },
            function (Point_1_1) {
                Point_1 = Point_1_1;
            },
            function (SimpleMarkerSymbol_1_1) {
                SimpleMarkerSymbol_1 = SimpleMarkerSymbol_1_1;
            },
            function (MapView_1_1) {
                MapView_1 = MapView_1_1;
            },
            function (PopupTemplate_1_1) {
                PopupTemplate_1 = PopupTemplate_1_1;
            },
            function (Search_1_1) {
                Search_1 = Search_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }
        ],
        execute: function () {
            Hero = /** @class */ (function () {
                function Hero(id, name) {
                    this.id = id;
                    this.name = name;
                }
                return Hero;
            }());
            exports_1("Hero", Hero);
            EsriSceneViewComponent = /** @class */ (function () {
                function EsriSceneViewComponent(_mapService, _viewCoordinationService, elRef, _fb) {
                    this._mapService = _mapService;
                    this._viewCoordinationService = _viewCoordinationService;
                    this.elRef = elRef;
                    this._fb = _fb;
                    this.viewCreated = new core_1.EventEmitter();
                    this.view = null;
                    this.events = [];
                }
                EsriSceneViewComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.myForm = this._fb.group({
                        fname: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
                        lname: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
                        emailadd: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
                        mobile: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10)]],
                        lat: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10)]],
                        long: ['', [forms_1.Validators.required, forms_1.Validators.minLength(10)]],
                        bgroup: ['', [forms_1.Validators.required, forms_1.Validators.minLength(6)]]
                    });
                    this.subcribeToFormChanges();
                    this.view = new MapView_1.default({
                        container: this.elRef.nativeElement.firstChild,
                        map: this._mapService.map,
                        zoom: this._viewCoordinationService.zoom,
                        center: this._viewCoordinationService.center,
                        rotation: this._viewCoordinationService.rotation
                    });
                    var searchWidget = new Search_1.default({
                        view: this.view
                    });
                    this.view.ui.add(searchWidget, {
                        position: "top-right",
                        index: 2
                    });
                    this.view.then(function (view) {
                        this.viewCreated.next(view);
                    }.bind(this));
                    this.view.watch('camera', function (newVal, oldVal, propertyName) {
                        this._viewCoordinationService.setValue(newVal, propertyName);
                    }.bind(this));
                    var modal = document.getElementById('myModal');
                    var span = document.getElementsByClassName("close")[0];
                    function createSymbol(path, color) {
                        var markerSymbol = new SimpleMarkerSymbol_1.default();
                        markerSymbol.path = path;
                        markerSymbol.path = path;
                        markerSymbol.color = color;
                        return markerSymbol;
                    }
                    this.view.on("click", function (event) {
                        var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
                        var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
                        document.getElementById('lat').value = lat;
                        document.getElementById('long').value = lon;
                        modal.style.display = "block";
                        span.onclick = function () {
                            modal.style.display = "none";
                        };
                    });
                    function addmarker(points, mapObj) {
                        var iconPath = "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z";
                        var initColor = "#ce641d";
                        var that = mapObj;
                        Object.keys(points).map(function (key) {
                            var template = new PopupTemplate_1.default({
                                title: points[key].first_name + ' ' + points[key].last_name,
                                content: "<b>Email:- <b>" + points[key].email + "<br><b>Blood Group:- </b>" + points[key].blood_group + "<br><b>Mobile:- </b>" + points[key].mobile
                            });
                            var loc = new Point_1.default(points[key].longtitude, points[key].latitude);
                            that.graphics.add(new Graphic_1.default(loc, createSymbol(iconPath, initColor), points[key], template));
                        });
                    }
                    this._mapService.getAllGroupLocations().subscribe(function (heroes) { addmarker(heroes, _this.view); }, function (error) { return _this.errorMessage = error; });
                };
                EsriSceneViewComponent.prototype.subcribeToFormChanges = function () {
                    var _this = this;
                    var myFormStatusChanges$ = this.myForm.statusChanges;
                    var myFormValueChanges$ = this.myForm.valueChanges;
                    myFormStatusChanges$.subscribe(function (x) { return _this.events.push({ event: 'STATUS_CHANGED', object: x }); });
                    myFormValueChanges$.subscribe(function (x) { return _this.events.push({ event: 'VALUE_CHANGED', object: x }); });
                };
                EsriSceneViewComponent.prototype.save = function (model, isValid) {
                    this.submitted = true;
                    model.lat = document.getElementById('lat').value;
                    model.long = document.getElementById('long').value;
                    this._mapService.addBloodGroup(model);
                };
                EsriSceneViewComponent.prototype.syncCamera = function (delaySync) {
                    var _this = this;
                    if (delaySync) {
                        setTimeout(function () {
                            _this.view.goTo(_this._viewCoordinationService.camera, {
                                animate: true
                            });
                        }, 2000);
                    }
                    else {
                        this.view.goTo(this._viewCoordinationService.camera, {
                            animate: false
                        });
                    }
                };
                __decorate([
                    core_1.Output(),
                    __metadata("design:type", Object)
                ], EsriSceneViewComponent.prototype, "viewCreated", void 0);
                EsriSceneViewComponent = __decorate([
                    core_1.Component({
                        selector: 'esri-scene-view',
                        templateUrl: './app/addressmap.html',
                        providers: [map_service_1.SimpleMapService]
                    }),
                    __metadata("design:paramtypes", [map_service_1.SimpleMapService,
                        view_coordination_service_1.ViewCoordinationService,
                        core_1.ElementRef,
                        forms_1.FormBuilder])
                ], EsriSceneViewComponent);
                return EsriSceneViewComponent;
            }());
            exports_1("EsriSceneViewComponent", EsriSceneViewComponent);
        }
    };
});
//# sourceMappingURL=esri-scene-view.component.js.map