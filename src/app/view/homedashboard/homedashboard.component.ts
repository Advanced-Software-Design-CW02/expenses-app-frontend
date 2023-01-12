import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/service/report.service';
import { UserService } from 'src/app/service/user.service';
import { UserTransactionService } from 'src/app/service/userTransaction.service';

@Component({
  selector: 'app-homedashboard',
  templateUrl: './homedashboard.component.html',
  styleUrls: ['./homedashboard.component.css'],
})
export class HomedashboardComponent implements OnInit {
  public totalIncome: number = 0;
  public totalExpence: number = 0;
  public totalBudget: number = 0;
  user: any;

  public userCategoryGroup: any[];
  public transactionList: any[];
  public categoryList: any[];

  public categoryArray: any = [];
  public transactionArray: any = [];

  public transactionCategory: any = [];

  public categoryTotalArrya: any[] = [];

  public spendRepot: any[];

  constructor(
    private userService: UserService,
    private userTransactionService: UserTransactionService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));

    this.getUserDetails();
    this.getUserTransaction();
    this.getCategoryForUser();
    this.getSpendReportByCategery(this.user.id);
  }

  public getUserDetails() {
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

        this.manipulateTransaction(this.transactionList);

        this.totalExpence = this.calTotal('expense');
        this.totalIncome = this.calTotal('income');
        console.log(this.totalExpence);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  calTotal(type: string) {
    let total = 0;
    this.transactionList.forEach((trn) => {
      console.log(trn);

      if (type == trn.transactionBaseType) {
        total = total + trn.transactionAmount;
      }
    });
    return total;
  }

  public getCategoryForUser() {
    this.categoryList = [];
    this.userService.getUserByIDUser(this.user.id).subscribe(
      (responce: any) => {
        console.log(responce);

        this.categoryList = responce.categories;
        this.manipulateCategory(this.categoryList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public manipulateCategory(array: any[]) {
    array.forEach((element) => {
      let category = {
        type: element.type,
        budget: element.budget,
        name: element.name,
      };

      this.categoryArray.push(category);
    });
  }

  public manipulateTransaction(array: any[]) {
    array.forEach((element) => {
      let transaction = {
        type: element.category.name,
        amount: element.transactionAmount,
      };

      this.transactionArray.push(transaction);
    });
  }

  public categoryTransactionByCategory(transactions: any[], categories: any[]) {
    categories.forEach((category) => {
      let typename = category.name;
      let budget = category.budget;
      let total = 0;
      transactions.forEach((transc) => {
        if (typename === transc.type) {
          total = total + transc.amount;
        }
      });
      let catto = {
        typename: typename,
        budget: budget,
        total: total,
      };
      this.categoryTotalArrya.push(catto);
    });

    console.log(this.categoryTotalArrya);
  }

  public getSpendReportByCategery(userID: any) {
    this.reportService.getSpendRepotByCategory(userID).subscribe(
      (response: any) => {
        this.spendRepot = response;
        this.calTotalBudegt();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public calTotalBudegt() {
    this.spendRepot.forEach((spend) => {
      this.totalBudget = this.totalBudget + spend.categoryBudegt;
    });
  }
}
