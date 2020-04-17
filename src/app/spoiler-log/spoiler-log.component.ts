import { Component, OnInit, Input } from '@angular/core';
import { SpoilerLogApiService } from '../services/spoiler-log-service';
import { SaveSpoilerLogRequest } from '../core/requests/save-spoiler-log-request';
import { JoinSessionRequest } from '../core/requests/join-session-request';
import { SignalRService } from '../services/signal-r.service';
import { EventEmitterService } from '../services/event-emitter.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { OoTRandomizerSession } from '../core/models/session-models';
import { View } from '../core/enums';
import { SaveSessionResponse } from '../core/responses/save-session-response';

@Component({
  selector: 'app-spoiler-log',
  templateUrl: './spoiler-log.component.html',
  styleUrls: ['./spoiler-log.component.scss']
})
export class SpoilerLogComponent implements OnInit {
  @Input() RandomizerSession: OoTRandomizerSession;
  public playerView: boolean = false;

  public session: string = "";
  public View: string = "";

  public JoinResumeButtonText = "Join Session";
  public SpectatorPlayerSlideToggleText = "Spectator";

  panelBasicSettingsOpenState: boolean = false;
  panelLocationOpenState: boolean = false;
  panelMainItemOpenState: boolean = false;
  panelEquipmentOpenState: boolean = false;
  panelSongsOpenState: boolean = false;
  panelDungeonRewardsOpenState: boolean = false;
  IsWait: boolean = false;

  constructor(private service: SpoilerLogApiService, public signalRService: SignalRService, private eventEmitterService: EventEmitterService) { }

  ngOnInit(): void {
    this.SetupRandomizer();
  }

  trackByFn(index, item) {
    return item.ID;
  }

  SetupRandomizer(): void {
    this.View = this.RandomizerSession != null ? View[this.RandomizerSession.View] : "";
    this.playerView = this.RandomizerSession != null ? this.RandomizerSession.View == View.Player : false;
  }

  ChangeText(): void {
    console.log("this.playerView", this.playerView);
    if (this.playerView) {
      this.JoinResumeButtonText = "Resume Session";
      this.SpectatorPlayerSlideToggleText = "Player";
    } else {
      this.JoinResumeButtonText = "Join Session";
      this.SpectatorPlayerSlideToggleText = "Spectator";
    }
  }

  JoinSession(): void {
    this.IsWait = true;
    let view = this.playerView ? View.Player : View.Spectator;
    let req = new JoinSessionRequest(this.session, "", view);
    this.service.Post<OoTRandomizerSession>('Session/JoinSession', req).subscribe(randomizer => {
      this.RandomizerSession = randomizer;
      this.SetupRandomizer();

      this.signalRService.startConnection();
      this.signalRService.addSpoilerLogDataListener();

      //if (this.eventEmitterService.subsVar == undefined) {
        this.eventEmitterService.subsVar = this.SetupSubscriptions();
      //}

      this.IsWait = false;
    });
  }

  SaveSession(): void {
    this.IsWait = true;
    let view = this.playerView ? View.Player : View.Spectator;
    let req = new SaveSpoilerLogRequest(this.RandomizerSession.SessionID, this.RandomizerSession.SpoilerLog, view);
    this.service.Post<OoTRandomizerSession>('Session/SaveSession', req).subscribe(log => {
      this.IsWait = false;
    });
  }

  SetupSubscriptions(): Subscription {
    var sub = new Subscription();

    sub.add(this.eventEmitterService.invokeLoad.subscribe((resp: SaveSessionResponse) => {
      //this.spoilerLog = session.SpoilerLog;
      //console.log("randomizer", randomizer);
      if(resp.ID == this.RandomizerSession.SessionID)
        this.RandomizerSession.SpoilerLog = resp.SpoilerLog;
    }));

    sub.add(this.eventEmitterService.invokeSave.subscribe(() => {
      this.SaveSession();
    }));
    return sub;
  }

}
