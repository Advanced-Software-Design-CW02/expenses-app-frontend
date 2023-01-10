import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public userFromGroup!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.userFromGroup = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      job: new FormControl(''),
      age: new FormControl(''),
    });
  }

  public userLogin() {
    console.log(this.userFromGroup);
    
  }

  public clearFrom() {
    this.userFromGroup.reset();
  }

  get f() {
    return this.userFromGroup.controls;
  }
}
