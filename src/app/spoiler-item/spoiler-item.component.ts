import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spoiler-item',
  templateUrl: './spoiler-item.component.html',
  styleUrls: ['./spoiler-item.component.scss']
})
export class SpoilerItemComponent implements OnInit {

  @Input() Item: any;
  Revealed: boolean = false;
  
  LocationName: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  toggleReveal(): void {
    this.LocationName = this.Revealed ? this.Item.locationNames[0].itemText : "";
  }

  viewText(): void {
    this.LocationName = this.Item.locationNames[0].itemText;
  }

  hideText():void {
    this.LocationName = "";
  }

}
