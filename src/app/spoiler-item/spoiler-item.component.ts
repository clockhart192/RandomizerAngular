import { Component, OnInit, Input } from '@angular/core';
import { EventEmitterService } from '../services/event-emitter.service';
import { Item } from '../core/models/spoiler-log';

@Component({
  selector: 'app-spoiler-item',
  templateUrl: './spoiler-item.component.html',
  styleUrls: ['./spoiler-item.component.scss']
})
export class SpoilerItemComponent implements OnInit {
  @Input() Item: Item;
  labelPosition: 'before' | 'after' = 'after';

  LocationNames: string = "";

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    if (this.Item.LocationNames != null) {
      let locations: string[] = [];

      this.Item.LocationNames.forEach(location => {
        locations.push(location.ItemText);
      });

      this.LocationNames = locations.join(' | ');
    }
  }

  toggleReveal(): void {
    this.eventEmitterService.onInvokeSave();
  }

}
