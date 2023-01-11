import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TransactionComponent } from './view/transaction/transaction.component';
import { UserviewComponent } from './view/userview/userview.component';
import { CategoryComponent } from './view/category/category.component';
import { ReportComponent } from './view/report/report.component';
import { HomedashboardComponent } from './view/homedashboard/homedashboard.component';
import { RegistaionComponent } from './view/registaion/registaion.component';
import { LoginComponent } from './view/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from './service/category.service';
import { LoadscreenComponent } from './view/loadscreen/loadscreen.component';
import { MatSelectModule } from '@angular/material/select';
import { UserTransaction } from './model/UserTransaction';
import { UserTransactionService } from './service/userTransaction.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransactionComponent,
    UserviewComponent,
    CategoryComponent,
    ReportComponent,
    HomedashboardComponent,
    RegistaionComponent,
    LoginComponent,
    LoadscreenComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    NgbAlertModule,
    MatSelectModule,
  ],

  providers: [UserService, CategoryService, UserTransactionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
