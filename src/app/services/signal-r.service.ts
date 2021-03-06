import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { environment } from '../../environments/environment';
import { EventEmitterService } from '../services/event-emitter.service';
import { OoTRandomizerSession } from '../core/models/session-models';
import { SaveSessionResponse } from '../core/responses/save-session-response';
import { SaveSpoilerLogRequest } from '../core/requests/spoiler-log';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  constructor(private eventEmitterService: EventEmitterService) { }
  public data: SaveSessionResponse;

  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.baseUrl + 'spoilerlogsession')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addSpoilerLogDataListener = () => {
    this.hubConnection.on('sendSpoilerData', (data: SaveSessionResponse) => {
      this.data = data;
      this.eventEmitterService.onUpdateReceived(data);
    });
  }

  public BroadcastUpdatedSession(data: SaveSpoilerLogRequest): void {
    this.hubConnection.invoke<SaveSessionResponse>("Send", data.SpoilerLog, data.ID)
  }
}