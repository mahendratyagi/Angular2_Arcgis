System.register(["@angular/core", "esri/Map", "esri/layers/FeatureLayer", "esri/layers/GraphicsLayer", "@angular/http", "rxjs/Rx"], function (exports_1, context_1) {
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
    var core_1, Map_1, FeatureLayer_1, GraphicsLayer_1, http_1, Hero, SimpleMapService, AnalysisMapService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Map_1_1) {
                Map_1 = Map_1_1;
            },
            function (FeatureLayer_1_1) {
                FeatureLayer_1 = FeatureLayer_1_1;
            },
            function (GraphicsLayer_1_1) {
                GraphicsLayer_1 = GraphicsLayer_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {
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
            SimpleMapService = /** @class */ (function () {
                function SimpleMapService(http) {
                    this.http = http;
                    this.map = null;
                    this.result = null;
                    this.locationlist = null;
                    this.map = new Map_1.default({
                        basemap: "streets",
                        center: [-117.789, 33.543],
                        zoom: 10
                    });
                }
                SimpleMapService.prototype.addBloodGroup = function (groupObj) {
                    var _this = this;
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    var body = JSON.stringify({ groupObj: groupObj });
                    var ob$ = this.http.post('http://localhost:3200/api/save_address', body, options)
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) { return _this.result = data; }, function (err) { return _this.handleError; }, function () { return _this.closeModal(); });
                };
                SimpleMapService.prototype.getAllGroupLocations = function (groupObj) {
                    return this.http.get('http://localhost:3200/api/get_all_locations')
                        .map(function (res) { var tmp = res.json(); return tmp; });
                };
                SimpleMapService.prototype.closeModal = function () {
                    document.getElementById('myModal').style.display = "none";
                    alert('You location added successfully');
                    window.location.reload();
                };
                SimpleMapService.prototype.handleError = function () {
                };
                SimpleMapService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [http_1.Http])
                ], SimpleMapService);
                return SimpleMapService;
            }());
            exports_1("SimpleMapService", SimpleMapService);
            AnalysisMapService = /** @class */ (function () {
                function AnalysisMapService() {
                    this.map = null;
                    this.map = new Map_1.default({
                        basemap: 'dark-gray-vector',
                        layers: [
                            new GraphicsLayer_1.default({
                                id: 'analysisLayer'
                            }),
                            new FeatureLayer_1.default({
                                url: 'https://services.arcgis.com/BG6nSlhZSAWtExvp/arcgis/rest/services/World_Volcanoes/FeatureServer/0',
                                id: 'volcanoesLayer'
                            })
                        ]
                    });
                }
                AnalysisMapService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [])
                ], AnalysisMapService);
                return AnalysisMapService;
            }());
            exports_1("AnalysisMapService", AnalysisMapService);
        }
    };
});
//# sourceMappingURL=map.service.js.map