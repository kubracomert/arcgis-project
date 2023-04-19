import { Component, OnInit } from "@angular/core";
import { loadModules } from "esri-loader";

@Component({
  selector: "display-pop-up",
  templateUrl: "./display-pop-up.component.html",
  styleUrls: ["./display-pop-up.component.css"],
})
export class DisplayPopUpComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/config",
      "esri/layers/FeatureLayer",
    ]).then(([Map, MapView, esriConfig, FeatureLayer]) => {
      esriConfig.apiKey =
        "AAPKaf9cd193bd4e4b918b3cc3b4a202477dsn99b1gAM_a3gQ8ng5Bob8ncTxI2Q8LFbMwhFt4zpw9fN7boVKxdOQbkYB7tayGs";

      // map create
      var map = new Map({
        basemap: "topo-vector",
      });

      //map show
      var view = new MapView({
        container: "displayPopUp",
        map: map,
        center: [-118.80543,34.02700],
        zoom: 5,
      });

      //information in pop up window
      const popupTrailheads = {
        title: "Trailhead",
        content:
          "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft",
      };
      
      //data
      const trailheads = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
        outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
        popupTemplate: popupTrailheads,
      });

      //added to the map
      map.add(trailheads);

      //
      const popupTrails = {
        title: "Trail Information",
        content: [
          {
            type: "media",
            mediaInfos: [
              {
                type: "column-chart",
                caption: "",
                value: {
                  fields: ["ELEV_MIN", "ELEV_MAX"],
                  normalizeField: null,
                  tooltipField: "Min and max elevation values",
                },
              },
            ],
          },
        ],
      };

      const trails = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
        outFields: ["TRL_NAME", "ELEV_GAIN"],
        popupTemplate: popupTrails,
      });

      //added to the map
      map.add(trails, 0);

      //information about the pop up
      const popupOpenspaces = {
        title: "{PARK_NAME}",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "AGNCY_NAME",
                label: "Agency",
                isEditable: true,
                tooltip: "",
                visible: true,
                format: null,
                stringFieldOption: "text-box",
              },
              {
                fieldName: "TYPE",
                label: "Type",
                isEditable: true,
                tooltip: "",
                visible: true,
                format: null,
                stringFieldOption: "text-box",
              },
              {
                fieldName: "ACCESS_TYP",
                label: "Access",
                isEditable: true,
                tooltip: "",
                visible: true,
                format: null,
                stringFieldOption: "text-box",
              },

              {
                fieldName: "GIS_ACRES",
                label: "Acres",
                isEditable: true,
                tooltip: "",
                visible: true,
                format: {
                  places: 2,
                  digitSeparator: true,
                },

                stringFieldOption: "text-box",
              },
            ],
          },
        ],
      };

      const openspaces = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
        outFields: [
          "TYPE",
          "PARK_NAME",
          "AGNCY_NAME",
          "ACCESS_TYP",
          "GIS_ACRES",
          "TRLS_MI",
          "TOTAL_GOOD",
          "TOTAL_FAIR",
          "TOTAL_POOR",
        ],
        popupTemplate: popupOpenspaces,
      });

      //added to the map
      map.add(openspaces, 0);
    });
  }
}
