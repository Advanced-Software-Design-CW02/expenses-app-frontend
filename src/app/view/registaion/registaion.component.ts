import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-registaion',
  templateUrl: './registaion.component.html',
  styleUrls: ['./registaion.component.css'],
})
export class RegistaionComponent implements OnInit {
  public userFromGroup!: FormGroup;

  constructor(private userService: UserService) {}

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

  get f() {
    return this.userFromGroup.controls;
  }

  public userRegistation() {
    console.log(this.userFromGroup);
    this.userService
      .createUser(
        this.f['firstName'].value,
        this.f['lastName'].value,
        this.f['email'].value,
        this.f['age'].value,
        this.f['job'].value
      )
      .subscribe(
        (responce: any) => {
          if (responce != null) {
          }
        },
        (error) => {}
      );
  }

  public clearFrom() {
    this.userFromGroup.reset();
  }
}
