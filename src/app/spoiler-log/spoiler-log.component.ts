import { Component, OnInit, Inject } from '@angular/core';
import { SpoilerLogApiService } from '../services/spoiler-log-service';
import { GetSpoilerLogRequest } from '../core/requests/get-spoiler-log-request';
import { SaveSpoilerLogRequest } from '../core/requests/save-spoiler-log-request';
import { JoinSessionRequest } from '../core/requests/join-session-request';
import { SignalRService } from '../services/signal-r.service';
import { EventEmitterService } from '../services/event-emitter.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { OoTSpoilerLog } from '../core/models/spoiler-log';
import { OoTRandomizerSession } from '../core/models/session-models';

@Component({
  selector: 'app-spoiler-log',
  templateUrl: './spoiler-log.component.html',
  styleUrls: ['./spoiler-log.component.scss']
})
export class SpoilerLogComponent implements OnInit {
  public spoilerLog: OoTSpoilerLog = null;

  public seed: string = "KOXET6365B";
  public session: string = "6969";

  panelBasicSettingsOpenState: boolean = false;
  panelLocationOpenState: boolean = false;
  panelMainItemOpenState: boolean = false;
  panelEquipmentOpenState: boolean = false;
  panelSongsOpenState: boolean = false;
  panelDungeonRewardsOpenState: boolean = false;
  // panelEntranceLocationsOpenState: boolean = false;
  // panelRandomizedSettingsOpenState: boolean = false;
  // panelGossipStonesOpenState: boolean = false;
  IsWait: boolean = false;

  constructor(private service: SpoilerLogApiService, public signalRService: SignalRService, private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addSpoilerLogDataListener();

    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.SetupSubscriptions();
    }
  }

  trackByFn(index, item) {
    return item.ID;
  }

  GetRandomizerSession(session: string): void {
    this.IsWait = true;
    let req = new JoinSessionRequest(session);
    this.service.Post<OoTRandomizerSession>('Session/JoinSession', req).subscribe(randomizer => {
      this.spoilerLog = randomizer.SpoilerLog;
      this.IsWait = false;
    });
  }

  GetSpoilerLog(seed: string): void {
    this.IsWait = true;
    let req = new GetSpoilerLogRequest(seed);
    this.service.Post<OoTSpoilerLog>('SpoilerLog/GetSpoilerLog', req).subscribe(log => {
      this.spoilerLog = log;
      this.IsWait = false;
    });
  }

  SaveSpoilerLog(): void {
    this.IsWait = true;
    let req = new SaveSpoilerLogRequest(this.session,this.spoilerLog);
    this.service.Post<OoTSpoilerLog>('SpoilerLog/SaveSpoilerLog', req).subscribe(log => {
      this.IsWait = false;
    });
  }

  SetupSubscriptions(): Subscription {
    var sub = new Subscription();

    sub.add(this.eventEmitterService.invokeLoad.subscribe((log: OoTSpoilerLog) => {
        this.spoilerLog = log;
      }));

    sub.add(this.eventEmitterService.invokeSave.subscribe(() => {
        this.SaveSpoilerLog();
      }));
    return sub;
  }

}
