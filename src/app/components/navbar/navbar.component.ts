import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import { variable } from '@angular/compiler/src/output/output_ast';
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

  okay(): boolean {
    var aux = this.JwtService.loggedIn;
    return aux;
  }
}
