import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/model/Category';
import { CategoryService } from 'src/app/service/category.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public categoryFromGroup: FormGroup;
  public user: any;
  public categoryList: any[];
  public showUpdatebtn: boolean = false;
  public selectedCategoryId: any;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getCategoryForUser();
    this.categoryFromGroup = new FormGroup({
      categoryName: new FormControl(''),
      categoryBudget: new FormControl(''),
    });
  }
  get f() {
    return this.categoryFromGroup.controls;
  }

  public clearFrom() {
    this.categoryFromGroup.reset();
  }

  public getCategoryForUser() {
    this.categoryList = [];
    this.userService.getUserByIDUser(this.user.id).subscribe(
      (responce: any) => {
        console.log(responce);

        this.categoryList = responce.categories;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public createCategory() {
    let category: Category = new Category();
    category.name = this.f['categoryName'].value;
    category.budget = this.f['categoryBudget'].value;

    console.log(category);

    this.categoryService.createCategory(category).subscribe(
      (responce: any) => {
        this.addCategoryToUser(responce.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public addCategoryToUser(category_id: any) {
    this.userService.addCategoryToUser(this.user.id, category_id).subscribe(
      (responce: any) => {
        this.getCategoryForUser();
        this.clearFrom();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public deleteCategory(category_id: any) {
    this.userService
      .removeCategoryFromUser(this.user.id, category_id)
      .subscribe(
        (responce) => {
          this.categoryList.forEach((element, index) => {
            if (element == category_id) delete this.categoryList[index];
          });
          this.getCategoryForUser();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public editeCategory(
    category_id: any,
    category_name: any,
    category_budget: any
  ) {
    this.showUpdatebtn = true;
    this.f['categoryName'].setValue(category_name);
    this.f['categoryBudget'].setValue(category_budget);
    this.selectedCategoryId = category_id;
  }

  public updateCategory() {
    this.categoryService
      .updateCategory(
        this.selectedCategoryId,
        this.user.id,
        this.f['categoryName'].value,
        this.f['categoryBudget'].value
      )
      .subscribe(
        (response: any) => {
          this.clearFrom();
          this.getCategoryForUser();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
