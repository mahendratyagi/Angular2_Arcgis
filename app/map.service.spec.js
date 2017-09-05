System.register(["./map.service"], function (exports_1, context_1) {
    "use strict";
    _this = this;
    var __moduleName = context_1 && context_1.id;
    var _this, map_service_1;
    return {
        setters: [
            function (map_service_1_1) {
                map_service_1 = map_service_1_1;
            }
        ],
        execute: function () {
            describe('MapService', function () {
                beforeEach(function () {
                    _this.mapService = new map_service_1.MapService();
                });
                it('should have a name for each basemap', function () {
                    /*this.mapService.getBasemaps().forEach((basemap) => {
                      expect(basemap.name).toBeDefined();
                    });*/
                });
            });
        }
    };
});
//# sourceMappingURL=map.service.spec.js.map