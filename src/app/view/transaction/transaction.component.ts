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

  public showError: boolean = false;
  public errormsg: string = '';
  public showSuccsuse: boolean = false;
  public succsusemsg: string = '';

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
      note: new FormControl(''),
      category: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      recurent: new FormControl(false),
    });
    //search
    this.searchTransaction.valueChanges.subscribe((val) => {
      console.log(val);

      let transaction = val.trim().toLowerCase();
      if (transaction.length > 0) {
        this.transactionList = this.transactionList.filter((cat) => {
          return (
            cat.transactionAmount.toString().match(val) ||
            cat.transactionBaseType.toLowerCase().match(val) ||
            cat.note.toLowerCase().match(val) ||
            cat.category.name.toLowerCase().match(val)
          );
        });
      } else {
        this.getUserTransaction();
      }
    });

    this.getUserDetails();
    this.getUserTransaction();
  }

  public showErrorMessage(message: string) {
    console.log('error show');

    this.showError = true;
    this.errormsg = message;
    setTimeout(
      function () {
        this.errormsg = '';
        this.showError = false;
        console.log(this.showError);
      }.bind(this),
      800
    );
  }

  public showSucssusMessage(message: string) {
    this.succsusemsg = message;
    this.showSuccsuse = true;
    setTimeout(
      function () {
        this.succsusemsg = '';
        this.showSuccsuse = false;
      }.bind(this),
      800
    );
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

  public editeTransactions(user_transaction_id: any) {}

  public deleteTransactions(user_transaction_id: any) {
    console.log(user_transaction_id);

    this.userTransactionService
      .deleteUserTransaction(user_transaction_id)
      .subscribe(
        (response) => {
          this.transactionList.forEach((element, index) => {
            if (element == user_transaction_id)
              delete this.transactionList[index];
            this.showSucssusMessage('Delete Sucssusful');
          });

          this.getUserTransaction();
        },
        (error) => {
          console.log(error);
          this.showErrorMessage('Transaction delete Error');
        }
      );
  }

  public createTransaction() {
    console.log(this.transactionFromGroup);

    if (!this.f['amount'].valid) {
      this.showErrorMessage('Please enter amount ');

      return;
    }

    if (!this.f['date'].valid) {
      this.showErrorMessage('Please enter date ');
      return;
    }

    if (!this.f['category'].valid) {
      this.showErrorMessage('Please select category');
      return;
    }

    if (this.transactionFromGroup.valid) {
      this.userTransactionService
        .createUserTransaction(
          this.f['category'].value.id,
          this.user.id,
          this.f['amount'].value,
          this.f['note'].value,
          this.f['date'].value,
          this.f['recurent'].value
        )
        .subscribe(
          (response) => {
            this.clearFrom();
            this.getUserTransaction();
            this.showSucssusMessage('Transaction create Sucssusful');
          },
          (error) => {
            console.log(error);
            this.showErrorMessage('Transaction create Error');
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
