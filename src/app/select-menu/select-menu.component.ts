import { Component, OnInit } from "@angular/core";
import { loadModules } from "esri-loader";

@Component({
  selector: "app-select-menu",
  templateUrl: "./select-menu.component.html",
  styleUrls: ["./select-menu.component.css"],
})
export class SelectMenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    loadModules([
      "esri/config",
      "esri/Map",
      "esri/views/MapView",
      "esri/rest/locator",
      "esri/Graphic",
    ]).then(([config, Map, MapView, locator, Graphic]) => {
      config.apiKey =
        "AAPKaf9cd193bd4e4b918b3cc3b4a202477dsn99b1gAM_a3gQ8ng5Bob8ncTxI2Q8LFbMwhFt4zpw9fN7boVKxdOQbkYB7tayGs";

      var map = new Map({
        basemap: "topo-vector",
      });

      var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [35, 39],
        zoom: 5,
      });

      const places = [
        "Choose a place type...",
        "Parks and Outdoors",
        "Coffee shop",
        "Gas station",
        "Food",
        "Hotel",
      ];
      const select = document.createElement("select");
      select.setAttribute("class", "esri-widget esri-select");
      select.setAttribute(
        "style",
        "width: 175px; font-family: 'Avenir Next W00'; font-size: 1em"
      );

      places.forEach(function(p){
        const option = document.createElement("option");
        option.value = p;
        option.innerHTML = p;
        select.appendChild(option);
      });

      view.ui.add(select, "top-right");
      const locatorUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

      function findPlaces(category, pt) {
        locator.addressToLocations(locatorUrl, {
          location: pt,
          categories: [category],
          maxLocations: 25,
          outFields: ["Place_addr", "PlaceName"]
        })
    
        .then(function(results) {
          view.popup.close();
          view.graphics.removeAll();
          results.forEach(function(result){
            view.graphics.add(
              new Graphic({
                attributes: result.attributes,  // Data attributes returned
                geometry: result.location, // Point returned
                symbol: {
                 type: "simple-marker",
                 color: "#000000",
                 size: "12px",
                 outline: {
                   color: "#ffffff",
                   width: "2px"
                 }
                },
    
                popupTemplate: {
                  title: "{PlaceName}", // Data attribute names
                  content: "{Place_addr}"
                }
             }));
          });
        });
      }
      view.watch("stationary", function(val) {
        if (val) {
           findPlaces(select.value, view.center);
        }
        });
    
      // Listen for category changes and find places
      select.addEventListener('change', function (event) {
        findPlaces(event.target.value, view.center);
      });
    });
  }
}
