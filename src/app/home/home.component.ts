import { Component, OnInit } from '@angular/core';
import { SpoilerLogApiService } from '../services/spoiler-log-service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  ping: string = "";
  pong: string = "";
  constructor(private service: SpoilerLogApiService) { }

  ngOnInit(): void {
    this.service.Get<string>('ping').subscribe(pong => {
      this.ping = pong;
    });

    this.service.Post<string>('Pong').subscribe(pong => {
      this.pong = pong;
    });
  }

}
