import { Component, OnInit } from '@angular/core';

import { SpoilerLogApiService } from '../services/spoiler-log-service';

import { RandomizerSession } from '../core/models/session-models';

import { UpdateSessionRequest } from '../core/requests/update-session-request';
import { DeleteSessionRequest } from '../core/requests/delete-session-request';

@Component({
  selector: 'app-manage-sessions',
  templateUrl: './manage-sessions.component.html',
  styleUrls: ['./manage-sessions.component.scss']
})
export class ManageSessionsComponent implements OnInit {

  Sessions: RandomizerSession[];
  SelectedSession: RandomizerSession;

  IsWait: boolean = false;
  DisplayedColumns: string[] = ['SessionID', 'Action'];

  constructor(private service: SpoilerLogApiService) { }

  ngOnInit(): void {
    this.GetAllSessions();
  }

  GetAllSessions(): void {
    this.IsWait = true;
    this.service.Post<RandomizerSession[]>('Session/GetAllSessions').subscribe(sessions => {
      this.Sessions = sessions;
      this.IsWait = false;
    });
  }

  UpdateSession(): void {
    this.IsWait = true;
    let req = new UpdateSessionRequest(this.SelectedSession);
    this.service.Post<RandomizerSession[]>('Session/UpdateSession', req).subscribe(sessions => {
      this.Sessions = sessions;
      this.IsWait = false;
    });
  }

  DeleteSession(Session: RandomizerSession): void {
    this.IsWait = true;
    let req = new DeleteSessionRequest(Session);
    this.service.Post<RandomizerSession[]>('Session/DeleteSession', req).subscribe(sessions => {
      this.Sessions = sessions;
      this.IsWait = false;
    });
  }

}
