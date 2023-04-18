import { Component, OnInit } from "@angular/core";
import { loadModules } from "esri-loader";

@Component({
  selector: "app-display-web-map",
  templateUrl: "./display-web-map.component.html",
  styleUrls: ["./display-web-map.component.css"],
})
export class DisplayWebMapComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    loadModules([
      "esri/views/MapView",
      "esri/config",
      "esri/WebMap",
      "esri/widgets/ScaleBar",
      "esri/widgets/Legend",
    ]).then(([MapView, config, WebMap, ScaleBar, Legend]) => {

      config.apiKey="AAPKaf9cd193bd4e4b918b3cc3b4a202477dsn99b1gAM_a3gQ8ng5Bob8ncTxI2Q8LFbMwhFt4zpw9fN7boVKxdOQbkYB7tayGs"

      var webmap = new WebMap({
        portalItem:{
          id:"41281c51f9de45edaf1c8ed44bb10e30"
        }
      })

      var view = new MapView({
        container: "viewDiv",
        map:webmap,
        // minZoom: 12,
        // maxZoom: 18,
        // sliderStyle: "small",
        // sliderPosition: "bottom-right",
        });

        const scalebar = new ScaleBar({
          view: view
        });
  
        view.ui.add(scalebar, "bottom-left");

        const legend = new Legend ({
          view: view
        });
        view.ui.add(legend, "top-right");

    });
  }
}
