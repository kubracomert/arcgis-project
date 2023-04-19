import { Component, OnInit } from "@angular/core";
import { loadModules } from "esri-loader";

@Component({
  selector: "app-multi-base",
  templateUrl: "./multi-base.component.html",
  styleUrls: ["./multi-base.component.css"],
})
export class MultiBaseComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    loadModules([
      "esri/config",
      "esri/views/MapView",
      "esri/Map",
      "esri/widgets/BasemapToggle",
      "esri/widgets/BasemapGallery",
    ]).then(([config, MapView, Map, BasemapToggle, BasemapGallery]) => {
      config.apiKey =
        "AAPKaf9cd193bd4e4b918b3cc3b4a202477dsn99b1gAM_a3gQ8ng5Bob8ncTxI2Q8LFbMwhFt4zpw9fN7boVKxdOQbkYB7tayGs";

      var map = new Map({
        basemap: "topo-vector",
      });

      var view = new MapView({
        container: "viewDiv",
        zoom: 7,
        map: map,
        center: [35, 37],
      });
      const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "arcgis-imagery",
      });
      view.ui.add(basemapToggle, "bottom-right");
      const basemapGallery = new BasemapGallery({
        view: view,
        source: {
          query: {
            title: '"World Basemaps for Developers" AND owner:esri'
          }
        }
      });
      view.ui.add(basemapGallery, "top-right"); 

    });
  }
}
