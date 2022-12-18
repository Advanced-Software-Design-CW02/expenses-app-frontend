import { ExpenseService } from './../service/expense.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  public expensess:any =[];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.getExpensee();
  }

  public getExpensee(): void {
    this.expenseService.getExpenses().subscribe(data =>{
      this.expensess = data;
      console.log(data);
      
    },error=>{
      console.log(error);
      
    });
  }

}
