import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  recipes = {};
  selectedRecipes: number = 0;
  selectedIngredients: Array<string> = [];
  ingredientsToShow: Array<string> = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/recipes.json').subscribe(res => {
      this.recipes = res;
    });
  }

  selectRecipe = (event) => {
    event.currentTarget.checked ? this.selectedRecipes++ : this.selectedRecipes--;
    event.currentTarget.parentNode.classList.toggle('selected');

    this.updateIngredients(event.currentTarget.checked, event.currentTarget.value);
  }

  updateIngredients = (checked, index) => {
    checked ? this.selectedIngredients.push(this.recipes[index].ingredients)
            : this.selectedIngredients.splice(this.selectedIngredients.indexOf(this.recipes[index].ingredients), 1);

    this.ingredientsToShow = [].concat(...this.selectedIngredients);
    this.ingredientsToShow.sort();
    this.ingredientsToShow = this.ingredientsToShow.filter((value, _index, self) => {
      return self.indexOf(value) === _index;
    });
  }
}
