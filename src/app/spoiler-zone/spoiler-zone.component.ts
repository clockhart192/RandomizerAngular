import { Component, OnInit, Input } from '@angular/core';
import { Zone } from '../core/models/spoiler-log';

@Component({
  selector: 'app-spoiler-zone',
  templateUrl: './spoiler-zone.component.html',
  styleUrls: ['./spoiler-zone.component.scss']
})
export class SpoilerZoneComponent implements OnInit {
  @Input() Zone: Zone;

  constructor() { }

  ngOnInit(): void {
  }

}
