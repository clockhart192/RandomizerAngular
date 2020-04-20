import { Component, OnInit, Input } from '@angular/core';
import { EventEmitterService } from '../services/event-emitter.service';
import { Location } from '../core/models/spoiler-log';

@Component({
  selector: 'app-spoiler-location',
  templateUrl: './spoiler-location.component.html',
  styleUrls: ['./spoiler-location.component.scss']
})
export class SpoilerLocationComponent implements OnInit {
  @Input() Location: Location;
  Revealed: boolean = false;
  ItemName: string = "";

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
  }

  toggleReveal(): void{
    this.ItemName = this.Location.Revealed ? this.Location.ItemAtLocation.Name : "";
    this.eventEmitterService.onInvokeSave();
  }

}
