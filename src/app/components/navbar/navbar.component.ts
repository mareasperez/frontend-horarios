import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private JwtService: JwtService) { }

  ngOnInit() {
  }
  logout() {
    this.JwtService.logout();
  }
}
