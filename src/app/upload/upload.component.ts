import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { SpoilerLogApiService } from '../services/spoiler-log-service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public ping: string;
  public progress: number;
  public message: string;

  constructor(private service: SpoilerLogApiService) {
    this.service.Get<string>('upload/ping').subscribe(result => {
      this.ping = result;
    }, error => console.error(error));
  }
  ngOnInit(): void {
  }

  upload(files): void {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    this.service.Post<any>('upload/UploadFile', formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }
}
