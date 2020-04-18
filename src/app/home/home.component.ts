import { Component, OnInit } from '@angular/core';
import { SpoilerLogApiService } from '../services/spoiler-log-service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ping: boolean = false;
  constructor(private service: SpoilerLogApiService) { }

  ngOnInit(): void {
    this.service.Get<string>('Session/Ping').subscribe(pong => {
      this.ping = true;
    });
  }

}
