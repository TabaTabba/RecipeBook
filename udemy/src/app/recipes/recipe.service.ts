import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

  // private recipes:Recipe[] = [
  //   new Recipe('Meatballs', 'in a tomato sauce', 'https://www.bibbyskitchenat36.com/wp-content/uploads/2021/01/DSC_9104-1.jpg', 
  //   [
  //     new Ingredient('Meat', 1),
  //     new Ingredient('Balls', 19)
  //   ]),
  //   new Recipe('Sandwich', 'with cucumber', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2022%2F03%2F01%2Fcucumber-sandwich.jpg', 
  //   [
  //     new Ingredient('Bread', 2),
  //     new Ingredient('Cucumber', 3)
  //   ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingList.AppState>) {}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}