import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'expens-tracker-app';
  isUserLogin: boolean = false;

  ngOnInit() {
    console.log('APP');
  }
}
