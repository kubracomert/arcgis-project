import { Component } from "@angular/core";
import { loadModules } from "esri-loader";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "arcgis-project";

  ngOnInit() {
    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/config",
      "esri/widgets/Locate",
      "esri/widgets/Track",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
      "esri/rest/locator",
    ]).then(
      ([Map, MapView, esriConfig, Locate, Track, Graphic, GraphicsLayer, locator]) => {
        esriConfig.apiKey =
          "AAPKaf9cd193bd4e4b918b3cc3b4a202477dsn99b1gAM_a3gQ8ng5Bob8ncTxI2Q8LFbMwhFt4zpw9fN7boVKxdOQbkYB7tayGs";

        /* Harita altlık ve katman ekleme */
        var map = new Map({
          basemap: {
            portalItem: {
              id: "4f2e99ba65e34bb8af49733d9778fb8e",
            },
          },
        });

        /*  Harita görüntüleme */
        var view = new MapView({
          container: "viewDiv",
          map: map,
          center: [35.5, 39],
          zoom: 5,
        });

        /* Konum bulma */
        const locate = new Locate({
          view: view,
          useHeadingEnabled: false,
          goToOverride: function (view, options) {
            options.target.scale = 1500;
            return view.goTo(options.target);
          },
        });
        view.ui.add(locate, "top-left");

        /* Konum takip */
        const track = new Track({
          view: view,
          graphic: new Graphic({
            symbol: {
              type: "simple-marker",
              size: "12px",
              color: "green",
              outline: {
                color: "#efefef",
                width: "1.5px",
              },
            },
          }),
          useHeadingEnabled: false,
        });
        view.ui.add(track, "top-left");

        /* Haritaya Grafik katmanı ekleme */
        const graphicsLayer = new GraphicsLayer();

        map.add(graphicsLayer);

        /* Noktasal belirlenen konum */
        const point = {
          type: "point",
          longitude: 29.0947,
          latitude: 37.783333,
        };

        const simpleMarkerSymbol = {
          type: "simple-marker",
          color: [226, 119, 40],
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        };

        const pointGraphic = new Graphic({
          geometry: point,
          symbol: simpleMarkerSymbol,
        });

        graphicsLayer.add(pointGraphic);

        /*  Belirlenen çizgisel konum */
        const polyline = {
          type: "polyline",
          paths: [
            [29, 37], //Longitude, latitude
            [29.04, 37.35], //Longitude, latitude
            [29.07, 37.783333], //Longitude, latitude
            [30, 36.9], //Longitude, latitude
            [31, 36.5], //Longitude, latitude
          ],
        };

        const simpleLineSymbol = {
          type: "simple-line",
          color: [226, 119, 40],
          width: 2,
        };

        const polylineGraphic = new Graphic({
          geometry: polyline,
          symbol: simpleLineSymbol,
        });

        graphicsLayer.add(polylineGraphic);

        /*  Belirlenen bölgesel konum */
        const polygon = {
          type: "polygon",
          rings: [
            [28.9, 37.6], //Longitude, latitude
            [28.95, 37.5], //Longitude, latitude
            [29, 37], //Longitude, latitude
            [29.05, 36.8], //Longitude, latitude
            [30, 36.7], //Longitude, latitude
          ],
        };
        const popupTemplate = {
          title: "{Name}",
          content: "{Description}",
        };
        const attributes = {
          Name: "Graphic",
          Description: "I am a polygon",
        };
        const simpleFillSymbol = {
          type: "simple-fill",
          color: [227, 139, 79, 0.8], // Orange, opacity 80%
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        };

        const polygonGraphic = new Graphic({
          geometry: polygon,
          symbol: simpleFillSymbol,
          attributes: attributes,
          popupTemplate: popupTemplate,
        });
        graphicsLayer.add(polygonGraphic);
      }
    );
  }
}
