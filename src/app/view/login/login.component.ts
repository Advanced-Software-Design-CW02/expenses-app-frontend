import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public userFromGroup!: UntypedFormGroup;
  public isShowLogin: boolean = true;
  public showError: boolean = false;
  public showSuccsuse: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userFromGroup = new UntypedFormGroup({
      email: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
    });
  }

  // clear login form 
  public clearFrom() {
    this.userFromGroup.reset();
  }

  // show error message if information is not valid
  public showErrorMessage() {
    this.showError = true;
    setTimeout(
      function () {
        this.showError = false;
      }.bind(this),
      1000
    );
  }

  // show success message if information is valid
  public showSucssusMessage() {
    this.showSuccsuse = true;
    setTimeout(
      function () {
        this.showSuccsuse = false;
      }.bind(this),
      1000
    );
  }

  // user login 
  public userLogin() {
    console.log(this.userFromGroup);

    if (!this.userFromGroup.valid) {
      this.showErrorMessage();
      return;
    }
    this.userService
      .userLogin(this.f['email'].value, this.f['password'].value)
      .subscribe(
        (responce: any) => {
          if (responce != null) {
            this.setUserObjectSession(responce);
            this.clearFrom();
            this.showSucssusMessage();
            window.location.replace('/dashbord');
          }
        },
        (error) => {
          this.showErrorMessage();
          console.log(error);
        }
      );
  }

  get f() {
    return this.userFromGroup.controls;
  }

  public setUserObjectSession(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getSessionData() {
    let user = sessionStorage.getItem('user');
    if (user !== null) {
      this.isShowLogin = false;
      window.location.reload();
    }
  }

  public navigateToRegister() {
    this.router.navigateByUrl('registation');
  }
}
