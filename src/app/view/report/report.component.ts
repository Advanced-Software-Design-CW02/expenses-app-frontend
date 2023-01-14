import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { UserTransactionService } from 'src/app/service/userTransaction.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  public transactionList: any[];
  user: any;
  public searchFromGroup: FormGroup;

  constructor(
    private userService: UserService,
    private userTransactionService: UserTransactionService
  ) {}

  ngOnInit(): void {
    this.searchFromGroup = new FormGroup({
      keyword: new FormControl(''),
      date: new FormControl(''),
    });
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getUserTransaction();
  }
  get f() {
    return this.searchFromGroup.controls;
  }

  public getUserTransaction() {
    this.userTransactionService.getCategoryById(this.user.id).subscribe(
      (response: any) => {
        console.log(response);
        this.transactionList = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public searchTransaction() {
    let keyword = this.f['keyword'].value ? this.f['keyword'].value : '';

    console.log(keyword);

    if (keyword.length > 0) {
      console.log(keyword.length > 0);

      this.transactionList = this.transactionList.filter((transaction) => {
        return (
          transaction.id == keyword.toLowerCase() ||
          transaction.note.toLowerCase().match(keyword.toLowerCase()) ||
          transaction.transactionBaseType
            .toLowerCase()
            .match(keyword.toLowerCase()) ||
          transaction.date.includes(keyword) ||
          transaction.category.name
            .toLowerCase()
            .match(keyword.toLowerCase()) ||
          transaction.category.type.toLowerCase().match(keyword.toLowerCase())
        );
      });
    } else {
      this.getUserTransaction();
    }
  }

  public resetSearch() {
    this.searchFromGroup.reset();
    this.getUserTransaction();
  }
}
