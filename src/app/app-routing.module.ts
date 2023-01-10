import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './view/category/category.component';
import { HomedashboardComponent } from './view/homedashboard/homedashboard.component';
import { LoginComponent } from './view/login/login.component';
import { RegistaionComponent } from './view/registaion/registaion.component';
import { ReportComponent } from './view/report/report.component';
import { TransactionComponent } from './view/transaction/transaction.component';
import { UserviewComponent } from './view/userview/userview.component';

const routes: Routes = [
  { path: 'dashbord', component: HomedashboardComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'user', component: UserviewComponent },
  { path: 'report', component: ReportComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registation', component: RegistaionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
