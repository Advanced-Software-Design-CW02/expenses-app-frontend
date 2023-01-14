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

  public selectedTransaction: any;

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

  // show an error message if entered information is not valid
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

  // show a success message if entered information is valid
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

  // get user details 
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

  // get user transaction
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

  // delete transaction
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

  // create transaction
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
      let recurent = false;

      if (this.f['recurent'].value == null) {
        recurent = false;
      } else {
        recurent = this.f['recurent'].value;
      }

      this.userTransactionService
        .createUserTransaction(
          this.f['category'].value.id,
          this.user.id,
          this.f['amount'].value,
          this.f['note'].value,
          this.f['date'].value,
          recurent
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

  // edit transaction
  public editeTransaction(i: any) {
    console.log(this.transactionList[i]);
    this.showUpdatebtn = true;
    this.f['category'].setValue(this.transactionList[i].category);
    this.f['amount'].setValue(this.transactionList[i].transactionAmount);
    this.f['note'].setValue(this.transactionList[i].note);
    this.f['date'].setValue(this.transactionList[i].date);
    this.f['recurent'].setValue(this.transactionList[i].recurring);
    this.selectedTransaction = this.transactionList[i];
  }

  // update transaction 
  public updateTransaction() {
    let categroy = this.f['category'].value.id;
    let user_id = this.user.id;
    let transaction_id = this.selectedTransaction.transactionID;
    let user_transaction_id = this.selectedTransaction.id;

    let amount = this.f['amount'].value;
    let note = this.f['note'].value;
    let date = this.f['date'].value;
    let recurent =
      this.f['recurent'].value == null ? false : this.f['recurent'].value;

    this.userTransactionService
      .updateUserTransaction(
        categroy,
        user_id,
        transaction_id,
        user_transaction_id,
        amount,
        note,
        date,
        recurent
      )
      .subscribe(
        (response: any) => {
          if (response) {
            this.showSucssusMessage('recode update successful');
            this.getUserTransaction();
            this.cancelUpdate();
          }
        },
        (error: any) => {
          console.log(error);

          this.showErrorMessage('error in update');
        }
      );
  }

  // clear form
  public clearFrom() {
    this.transactionFromGroup.reset();
  }

  // cancel update
  public cancelUpdate() {
    this.showUpdatebtn = false;
    this.clearFrom();
  }
}
