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
  public searchCategory: FormControl;
  public user: any;
  public categoryList: any[];
  public showUpdatebtn: boolean = false;
  public selectedCategoryId: any;
  public types = ['income', 'expense'];

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
      categoryType: new FormControl(''),
    });

    this.searchCategory = new FormControl('');

    this.searchCategory.valueChanges.subscribe((val) => {
      let category = val.trim().toLowerCase();
      if (category.length > 0) {
        this.categoryList = this.categoryList.filter((cat) => {
          return cat.name.toLowerCase().match(val);
        });
      } else {
        this.getCategoryForUser();
      }
    });
  }
  get f() {
    return this.categoryFromGroup.controls;
  }

  // clear category form - will move to reset form
  public clearFrom() {
    this.categoryFromGroup.reset();
  }

  // get categories for user
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

  // create a category
  public createCategory() {
    let category: Category = new Category();
    category.name = this.f['categoryName'].value;
    category.budget = this.f['categoryBudget'].value;
    category.type = this.f['categoryType'].value;
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

  // add categories
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


  // delete categories
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

  // edit categories
  public editeCategory(
    category_id: any,
    category_name: any,
    category_budget: any,
    category_type: any
  ) {
    this.showUpdatebtn = true;
    this.f['categoryName'].setValue(category_name);
    this.f['categoryBudget'].setValue(category_budget);
    this.f['categoryType'].setValue(category_type);
    this.selectedCategoryId = category_id;
  }
  public onSearch(val) {
    console.log(val);
  }

  // update categories
  public updateCategory() {
    this.categoryService
      .updateCategory(
        this.selectedCategoryId,
        this.user.id,
        this.f['categoryName'].value,
        this.f['categoryBudget'].value,
        this.f['categoryType'].value
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
