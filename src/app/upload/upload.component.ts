import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse  } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public ping: string;
  public progress: number;
  public message: string;
  
  constructor(private http: HttpClient, @Inject('BASE_URL')  baseUrl: string) {
    http.get<string>(baseUrl + 'api/upload/ping').subscribe(result => {
      this.ping = result;
    }, error => console.error(error));
  }
  ngOnInit(): void {
  }

  upload(files):void {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', "https://localhost:44362/" + 'api/upload', formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }

}
