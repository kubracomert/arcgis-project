import { Component, OnInit } from "@angular/core";
import { loadModules } from "esri-loader";

@Component({
  selector: "app-feature-layer",
  templateUrl: "./feature-layer.component.html",
  styleUrls: ["./feature-layer.component.css"],
})
export class FeatureLayerComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    loadModules([
      "esri/config",
      "esri/Map",
      "esri/views/MapView",
      "esri/widgets/Sketch",
      "esri/layers/GraphicsLayer",
      "esri/layers/FeatureLayer",
    ]).then(([config, Map, MapView, Sketch, GraphicsLayer, FeatureLayer]) => {
      config.apiKey =
        "AAPKaf9cd193bd4e4b918b3cc3b4a202477dsn99b1gAM_a3gQ8ng5Bob8ncTxI2Q8LFbMwhFt4zpw9fN7boVKxdOQbkYB7tayGs";

      const map = new Map({
        basemap: "topo-vector",
      });

      const view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 5,
        center: [35, 39],
      });

      const graphicsLayerSketch = new GraphicsLayer();
      map.add(graphicsLayerSketch);

      const sketch = new Sketch({
        layer: graphicsLayerSketch,
        view: view,
        creationMode: "update", // Auto-select
      });

      view.ui.add(sketch, "top-right");

      const parcelLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
      });

      function queryFeaturelayer(geometry) {
        const parcelQuery = {
          spatialRelationship: "intersects", // Relationship operation to apply
          geometry: geometry, // The sketch feature geometry
          outFields: ["APN", "UseType", "TaxRateCity", "Roll_LandValue"], // Attributes to return
          returnGeometry: true,
        };

        parcelLayer
          .queryFeatures(parcelQuery)
          .then((results) => {
            displayResults(results);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      sketch.on("update", (event) => {
        if (event.state === "start") {
          queryFeaturelayer(event.graphics[0].geometry);
        }
        if (event.state === "complete") {
          // graphicsLayerSketch.remove(event.graphics[0]); // Clear the graphic when a user clicks off of it or sketches new one
        }
        // Change
        if (
          event.toolEventInfo &&
          (event.toolEventInfo.type === "scale-stop" ||
            event.toolEventInfo.type === "reshape-stop" ||
            event.toolEventInfo.type === "move-stop")
        ) {
          queryFeaturelayer(event.graphics[0].geometry);
        }
      });

      function displayResults(results) {
        // Create a blue polygon
        const symbol = {
          type: "simple-fill",
          color: "green",
          outline: {
            color: "white",
            width: 0.5,
          },
        };

        const popupTemplate = {
          title: "Parcel {APN}",
          content:
            "Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}",
        };
        results.features.map((feature) => {
          feature.symbol = symbol;
          feature.popupTemplate = popupTemplate;
          return feature;
        });

        view.popup.close();
        view.graphics.removeAll();
        // Add features to graphics layer
        view.graphics.addMany(results.features);
      }
    });
  }
}
