import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { UserTransactionService } from 'src/app/service/userTransaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  public searchTransaction: FormControl;
  public transactionFromGroup: FormGroup;
  public userCategoryGroup: any[];
  public transactionList: any[];
  public types = ['income', 'expense'];
  public showUpdatebtn: boolean = false;
  user: any;

  constructor(
    private userService: UserService,
    private userTransactionService: UserTransactionService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.searchTransaction = new FormControl('');
    this.transactionFromGroup = new FormGroup({
      amount: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      date :new FormControl('', Validators.required)
    });
    //search
    this.searchTransaction.valueChanges.subscribe((val) => {
      console.log(val);

      let transaction = val.trim().toLowerCase();
      if (transaction.length > 0) {
        this.transactionList = this.transactionList.filter((cat) => {
          return (
            cat.amount.toString().match(val) ||
            cat.transactionBaseType.toLowerCase().match(val) ||
            cat.note.toLowerCase().match(val)
          );
        });
      } else {
        this.getUserTransaction();
      }
    });

    this.getUserDetails();
    this.getUserTransaction();
  }

  public getUserDetails() {
    this.transactionList = [];
    this.userCategoryGroup = [];
    this.userService.getUserByIDUser(this.user.id).subscribe(
      (responce: any) => {
        console.log(responce);
        this.userCategoryGroup = responce.categories;
      },
      (error) => {
        console.log(error);
      }
    );
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

  public editeTransactions(user_transaction_id: any) {

  }

  public deleteTransactions(user_transaction_id: any) {
    console.log(user_transaction_id);

    this.userTransactionService
      .deleteUserTransaction(user_transaction_id)
      .subscribe(
        (response) => {
          this.transactionList.forEach((element, index) => {
            if (element == user_transaction_id)
              delete this.transactionList[index];
          });

          this.getUserTransaction();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public createTransaction() {
    console.log(this.f);

    if (this.transactionFromGroup.valid) {
      this.userTransactionService
        .createUserTransaction(
          this.f['category'].value.id,
          this.user.id,
          this.f['amount'].value,
          this.f['note'].value,
          this.f['date'].value
        )
        .subscribe(
          (response) => {
            this.clearFrom();
            this.getUserTransaction();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  get f() {
    return this.transactionFromGroup.controls;
  }

  public updateTransaction() {}

  public clearFrom() {
    this.transactionFromGroup.reset();
  }
}
