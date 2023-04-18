import { Component, OnInit } from "@angular/core";
import { loadModules } from "esri-loader";

@Component({
  selector: "app-edit-feature",
  templateUrl: "./edit-feature.component.html",
  styleUrls: ["./edit-feature.component.css"],
})
export class EditFeatureComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    loadModules([
      "esri/config",
      "esri/Map",
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/widgets/Editor",
    ]).then(([config, Map, MapView, FeatureLayer, Editor]) => {

      const myPointsFeatureLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/my_points/FeatureServer",
      });

      config.apiKey =
        "AAPKaf9cd193bd4e4b918b3cc3b4a202477dsn99b1gAM_a3gQ8ng5Bob8ncTxI2Q8LFbMwhFt4zpw9fN7boVKxdOQbkYB7tayGs";

      var map = new Map({
        basemap: "topo-vector",
        layers: [myPointsFeatureLayer],
      });

      var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543, 34.027],
        zoom: 12,
      });

      // Editor widget
      const editor = new Editor({
        view: view,
      });
      // Add widget to the view
      view.ui.add(editor, "top-right");
    });
  }
}
