import type { OnInit } from "@angular/core";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-search";
import "@arcgis/map-components/components/arcgis-legend";
import "@arcgis/map-components/dist/components/arcgis-layer-list";
import { config } from "../../../../config";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = "map-components-angular-sample";
  itemId = config.itemId;

  arcgisViewReadyChange(event: any) {
    console.log("MapView ready", event);
  }

  ngOnInit() {
    console.log("OnInit");
  }
}
