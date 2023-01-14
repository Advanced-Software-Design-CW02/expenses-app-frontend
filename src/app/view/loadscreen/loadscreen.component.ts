import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loadscreen',
  templateUrl: './loadscreen.component.html',
  styleUrls: ['./loadscreen.component.css'],
})
export class LoadscreenComponent implements OnInit {
  constructor(private route: Router) {}
  
  ngOnInit(): void {
    let user = sessionStorage.getItem('user');
    if (user) {
      // if user logged in navigate to dashboard page
      this.route.navigateByUrl('/dashbord');
    } else {
      // navigate to login page
      this.route.navigateByUrl('/login');
    }
  }
}
