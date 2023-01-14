import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public isShowLogin: boolean = false;
  public username: string;
  public userObj: any;
  constructor(private router: Router) {}
  showFiller = false;

  ngOnInit(): void {
    this.getSessionData();
  }

  // Get data from the session storage
  public getSessionData() {
    let user = sessionStorage.getItem('user');

    if (user === null) {
      this.isShowLogin = true;
    } else {
      this.userObj = JSON.parse(user);
      this.username = this.userObj.firstName;
    }
  }

  // Clear data from the session storage
  public cleaerSession() {
    sessionStorage.removeItem('user');
    window.location.replace('/');
  }
}
