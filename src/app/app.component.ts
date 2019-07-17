import { Component, OnInit } from '@angular/core';
import { WsService } from './services/ws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Frontend';

  constructor(private wSocket:WsService){
    
  }

  ngOnInit(){
    this.wSocket.setsock();
  }
}
