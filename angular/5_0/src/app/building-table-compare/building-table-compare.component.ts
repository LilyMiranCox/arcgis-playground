import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Map from "@arcgis/core/Map";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { ArcgisMap } from "@arcgis/map-components/components/arcgis-map";

@Component({
  selector: "building-table-compare",
  templateUrl: "./building-table-compare.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule]
})
export class BuildingTableCompareComponent implements OnInit, OnDestroy {
  sources = ['Draw Boundary', 'Boundary 1', 'Boundary 2', 'Boundary 3', 'Boundary 4'];
  nodeItems = <any>[];
  bldgItems = <any>[];
  filteredBldgItems = <any>[];
  htmlListActive = false;
  calciteListActive = false;
  @Input() view: ArcgisMap | undefined;
  graphicsLayer: GraphicsLayer;

  constructor() {
    this.graphicsLayer = new GraphicsLayer({
      title: "Building Graphics",
      listMode: "show"
    });
    
  }

  ngOnInit(): void {
    this.view?.map?.add(this.graphicsLayer);
    this.onAddElementChunk();
  }
  onAddElementChunk() {
    //for(let i = 0; i < 1; i++) {
    const extent = new Extent({
      xmin: -122.5,
      ymin: 37.7,
      xmax: -122.3,
      ymax: 37.8,
      spatialReference: { wkid: 4326 }
    });

      let nodeName = `CAGAD0${this.nodeItems.length+1}P0C`;
      this.nodeItems.push({'nodeName': nodeName, 'count': 60, 'color': "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'), 'includeInList': `Title for item ${this.nodeItems.length+1}`});
      for(let j = 0; j < 60; j++) {
        let newPoint = new Graphic({
            geometry: new Point({
              x: Math.random() * (extent.xmax - extent.xmin) + extent.xmin,
              y: Math.random() * (extent.ymax - extent.ymin) + extent.ymin,
              spatialReference: extent.spatialReference
            }),
            symbol: new SimpleMarkerSymbol({
              color: this.nodeItems[this.nodeItems.length-1].color,
              size: 8
            })
          })

        this.graphicsLayer.add(newPoint);

        this.bldgItems.push({
          id: `Item ${(this.nodeItems.length*60)+j+1}`, 
          address: `1292 KIFER RD 94086`, 
          unit: `${(this.nodeItems.length*60)+j+1}`, 
          nodeName: nodeName, 
          graphic: newPoint
        });

      }
    //}
    this.filteredBldgItems = [...this.bldgItems];
  }

  onRemoveElementChunk() {
    let popped = this.nodeItems.pop();
    if (popped) {
      this.bldgItems = (<any []>this.bldgItems).filter(bldg => bldg.nodeName !== popped.nodeName);
      this.filteredBldgItems = [...this.bldgItems];
    }
  }

  onGoTo(bldg: any) {
    if (bldg.graphic) {
      this.view?.goTo({
        target: bldg.graphic,
        zoom: 15
      });
    }
  }

  ngOnDestroy(): void {
    this.view?.map?.remove(this.graphicsLayer);
  }

}
