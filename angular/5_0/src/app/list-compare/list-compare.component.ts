import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from "@angular/core";
import "@arcgis/map-components/components/arcgis-expand";

@Component({
  selector: "list-compare",
  templateUrl: "./list-compare.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule]
})
export class ListCompare implements OnInit {
  listItems = <any>[];
  htmlListActive = false;
  calciteListActive = false;
  ngOnInit(): void {
    for(let i = 0; i < 200; i++) {
      this.listItems.push({'id': i, 'name': `Item ${i}`, 'description': `Description for item ${i}`, 'title': `Title for item ${i}`});
    }
  }

}
