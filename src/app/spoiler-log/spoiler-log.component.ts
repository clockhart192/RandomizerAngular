import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { SpoilerLogApiService } from '../core/spoiler-log-service'
import { GetSpoilerLogRequest } from '../core/get-spoiler-log-request'

@Component({
  selector: 'app-spoiler-log',
  templateUrl: './spoiler-log.component.html',
  styleUrls: ['./spoiler-log.component.scss']
})
export class SpoilerLogComponent implements OnInit {
  public spoilerLog: any = null;

  public seed: string = "KOXET6365B";

  panelBasicSettingsOpenState: boolean = false;
  panelLocationOpenState: boolean = false;
  panelMainItemOpenState: boolean = false;
  panelDungeonsOpenState: boolean = false;
  panelEntranceLocationsOpenState: boolean = false;
  panelRandomizedSettingsOpenState: boolean = false;
  panelGossipStonesOpenState: boolean = false;
  IsWait: boolean = false;

  constructor(private http: HttpClient, private service: SpoilerLogApiService) { }

  ngOnInit(): void {
  }

  trackByFn(index, item) {
    return item.ID;
  }

  GetSpoilerLog(seed: string): void {
    this.IsWait = true;
    let req = new GetSpoilerLogRequest(seed);
    this.service.Post<any>('GetSpoilerLog', req).subscribe(log => {
      this.spoilerLog = log;
      this.IsWait = false;
    });
  }
}
