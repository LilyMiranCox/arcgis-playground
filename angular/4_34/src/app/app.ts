import type { OnInit } from "@angular/core";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-layer-list";

import Graphic from "@arcgis/core/Graphic";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import Point from "@arcgis/core/geometry/Point";
import type { ArcgisMap } from "@arcgis/map-components/components/arcgis-map";
import { CommonModule } from "@angular/common";
import { config } from "../../../../config";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.css",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule]
})
export class App implements OnInit {
  title = "map-components-angular-sample";
  elocTablecolumns = [
    { "label": "Address Id", "columnName": "ADDRESS_ID" },
    { "label": "Address", "columnName": "ELC_ADDRESSKEY" },
    { "label": "Unit", "columnName": "ELC_UNIT" },
    { "label": "Fiber Node Name", "columnName": "ROUTER_HSI" }
  ];
  elocTableGraphics: Graphic[] = [];
  itemId = config.itemId;
  ngOnInit(): void {
    console.log("OnInit");
    for(let i=0; i<237; i++) {
      this.elocTableGraphics.push({attributes:{ADDRESS_ID: i+1, ELC_ADDRESSKEY: "123 Main St", ELC_UNIT: `APT ${i+1}`, ROUTER_HSI: `Node${i+1}`}} as Graphic);
    }
  }

  arcgisViewReadyChange(event: CustomEvent): void {
    const viewElement = event.target as ArcgisMap;

    const point = new Point({
      longitude: -118.38,
      latitude: 33.34,
    });

    // Create a symbol for drawing the point
    const markerSymbol = new SimpleMarkerSymbol({
      style: "triangle",
      size: 20,
      color: "red",
      outline: {
        color: "white",
        width: 2,
      },
    });

    // Create a graphic and add the geometry and symbol to it
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
    });

    viewElement.graphics.add(pointGraphic);
  }
}
