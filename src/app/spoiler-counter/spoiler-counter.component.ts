import { Component, OnInit,Input } from '@angular/core';
import { EventEmitterService } from '../services/event-emitter.service';
import { CollectionCounter } from '../core/models/spoiler-log';

@Component({
  selector: 'app-spoiler-counter',
  templateUrl: './spoiler-counter.component.html',
  styleUrls: ['./spoiler-counter.component.scss']
})
export class SpoilerCounterComponent implements OnInit {
  @Input() Counter: CollectionCounter;
  @Input() PlayerView: boolean;

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
  }

  counterChanged(): void {
    console.log("Attempting to trigger save from counter.");
    this.eventEmitterService.onInvokeSave();
  }

}
