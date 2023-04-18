import { Component, OnInit } from "@angular/core";
import { loadModules } from "esri-loader";

@Component({
  selector: "app-reverse-geocode",
  templateUrl: "./reverse-geocode.component.html",
  styleUrls: ["./reverse-geocode.component.css"],
})
export class ReverseGeocodeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    loadModules([
      "esri/config",
      "esri/Map",
      "esri/views/MapView",
      "esri/rest/locator",
    ]).then(([config, Map, MapView, locator]) => {
      var map = new Map({
        basemap: "topo-vector",
      });
      var view = new MapView({
        container: "viewDiv",
        map: map,  center: [-78.50169,-0.21489],
        zoom: 7
      });

      const serviceUrl = "http://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

      view.on("click", function(evt){
        const params = {
          location: evt.mapPoint
        };
        locator.locationToAddress(serviceUrl, params)
        .then(function(response) { // Show the address found
          const address = response.address;
          showAddress(address, evt.mapPoint);
        }, function(err) { // Show no address found
          showAddress("No address found.", evt.mapPoint);
        });
      });

      function showAddress(address, pt) {
        view.popup.open({
          title:  + Math.round(pt.longitude * 100000)/100000 + ", " + Math.round(pt.latitude * 100000)/100000,
          content: address,
          location: pt
        });
      }

    });
  }
}
