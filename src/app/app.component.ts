import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  recipes = {};
  selectedRecipes = 0;
  selectedIngredients = [];
  ingredientsToShow = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/recipes.json').subscribe(res => {
    this.recipes = res;
    });
  }

  selectRecipe = (event) => {
    event.currentTarget.checked ? this.selectedRecipes++ : this.selectedRecipes--;

    this.updateIngredients(event.currentTarget.checked, event.currentTarget.value)
  }

  updateIngredients = (checked, index) => {
      if (checked) {
        //this.selectedIngredients.push(...this.recipes[index].ingredients);
        this.selectedIngredients.push(this.recipes[index].ingredients);
        //console.log(this.selectedIngredients);
      } else {
        //console.log(this.selectedIngredients.includes(this.recipes[index].ingredients));
        this.selectedIngredients.splice(this.selectedIngredients.indexOf(this.recipes[index].ingredients), 1);
        //console.log('after removal: ', this.selectedIngredients);
      }
      
      this.ingredientsToShow = [].concat(...this.selectedIngredients);
      //console.log('to show: ', this.ingredientsToShow);

      this.ingredientsToShow.sort();
      this.ingredientsToShow = this.ingredientsToShow.filter((val, ind, self) => {
        return self.indexOf(val) === ind;
      });
      //console.log('to show after filter: ', this.ingredientsToShow);
  }
}
