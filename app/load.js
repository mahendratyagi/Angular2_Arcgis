// load Esri modules with the help of esri-system-js library
esriSystem.register([
    'esri/geometry/Point',
    'esri/geometry/geometryEngineAsync',
    'esri/Graphic',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/PopupTemplate',
    'esri/Map',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/widgets/Search',
    'esri/views/MapView',
    'esri/views/SceneView'
], function () {
    // bootstrap the app
    // System.import('app/main')
    System.import('app')
        .then(null, console.error.bind(console));
});
//# sourceMappingURL=load.js.map