import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store'
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private igSchangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingList.AppState>) {}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    this.store.select('shoppingList').subscribe();
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igSchangeSub = this.shoppingListService.IngredientsChanged.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    //});
  }

  ngOnDestroy(): void {
    //this.igSchangeSub.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }
}