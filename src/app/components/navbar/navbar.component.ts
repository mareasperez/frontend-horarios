import { Component, OnInit } from '@angular/core';
import { JwtService } from '../../services/jwt.service';
import { DisableSideBarService } from 'src/app/services/disable-side-bar.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // tslint:disable: no-shadowed-variable
  public disableSide: boolean;
  public user: string;
  constructor(
    private JwtService: JwtService,
    private ds: DisableSideBarService,
  ) { }

  ngOnInit() {
    this.ds.onDisableSide.subscribe(res => {
      this.disableSide = res; console.log('se emitio algo');
    });
    this.user = this.JwtService.username;
  }
  logout() {
    localStorage.clear();
    this.JwtService.logout();
  }

  okay(): boolean {
    const aux = this.JwtService.loggedIn;
    return aux;
  }
}
