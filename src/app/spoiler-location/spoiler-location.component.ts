import { Component, OnInit, Input } from '@angular/core';


// export interface SpoilerLocation {
//   Name: string;
//   ItemAtLocation: SpoilerItem;
// }

// export interface SpoilerItem {
//   Name: string;
//   Model: string;
//   Price: number;
// }

@Component({
  selector: 'app-spoiler-location',
  templateUrl: './spoiler-location.component.html',
  styleUrls: ['./spoiler-location.component.scss']
})
export class SpoilerLocationComponent implements OnInit {
  @Input() Location: any;
  Revealed: boolean = false;
  ItemName: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  toggleReveal(): void{
    this.ItemName = this.Revealed ? this.Location.itemAtLocation.name : "";
  }

}
