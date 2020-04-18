import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SpoilerLogApiService } from '../services/spoiler-log-service';
import { CreateSessionRequest } from '../core/requests/create-session-request';
import { OoTSpoilerLog } from '../core/models/spoiler-log';
import { OoTRandomizerSession } from '../core/models/session-models'
import { Game } from '../core/enums';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public progress: number = 0;
  public message: string = "";
  IsWait: boolean = false;

  public session: string = "";
  public spoilerLog: OoTSpoilerLog = null;
  public RandomizerSession: OoTRandomizerSession = null;

  constructor(private http: HttpClient, private service: SpoilerLogApiService) { }

  ngOnInit(): void { }

  upload(files): void {
    this.IsWait = true;

    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', environment.baseUrl + 'api/upload', formData);

    this.http.request<OoTSpoilerLog>(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        console.log(event);
        this.spoilerLog = event.body;
      }
      this.IsWait = false;
    }, error => {
      console.error(error);
      this.message = "Error uploading file, invalid format.";
    });
  }

  CreateSession(session: string) {
    this.IsWait = true;
    let request = new CreateSessionRequest(session, '', this.spoilerLog.Seed, Game.OcarinaOfTime, this.spoilerLog);

    this.service.Post<OoTRandomizerSession>('Session/CreateSession', request).subscribe(session => {
      this.RandomizerSession = session;
      this.IsWait = false;
    }, error => {
      console.error(error);
    });
  }
}
