import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css'],
})
export class UserviewComponent implements OnInit {
  public userFromGroup: FormGroup;

  public user: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.userFromGroup = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      job: new FormControl(''),
      age: new FormControl(''),
    });

    this.setData();
    console.log(this.userFromGroup);
  }

  get f() {
    return this.userFromGroup.controls;
  }

  // set data in user view
  public setData() {
    this.f['firstName'].setValue(this.user.firstName);
    this.f['lastName'].setValue(this.user.lastName);
    this.f['email'].setValue(this.user.email);
    this.f['job'].setValue(this.user.job);
    this.f['age'].setValue(this.user.age);
  }

  // update user view 
  public update() {
    this.userService
      .updateUser(
        this.user.id,
        this.f['firstName'].value,
        this.f['lastName'].value,
        this.f['email'].value,
        this.f['job'].value,
        this.f['age'].value
      )
      .subscribe((response) => {
        sessionStorage.setItem('user', JSON.stringify(response));
      });
  }
}
