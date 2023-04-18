import { Component, OnInit } from "@angular/core";
import { loadModules } from "esri-loader";

@Component({
  selector: "app-search-address",
  templateUrl: "./search-address.component.html",
  styleUrls: ["./search-address.component.css"],
})
export class SearchAddressComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/config",
      "esri/widgets/Search"
    ]).then(
      ([
        Map,
        MapView,
        esriConfig,
        Search
      ]) => {
        esriConfig.apiKey =
          "AAPKaf9cd193bd4e4b918b3cc3b4a202477dsn99b1gAM_a3gQ8ng5Bob8ncTxI2Q8LFbMwhFt4zpw9fN7boVKxdOQbkYB7tayGs";

        /* Harita altlık ve katman ekleme */
        var map = new Map({
          basemap: "topo-vector"
        });

        /*  Harita görüntüleme */
        var view = new MapView({
          container: "viewDiv",
          map: map,
          center: [35.5, 39],
          zoom: 5,
        });

        const search = new Search({
          view: view,
        })

        view.ui.add(search, "top-right");
      }
    );
  }
}
