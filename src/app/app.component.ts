import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  recipes = {};

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.http.get('assets/recipes.json').subscribe(res => {
    this.recipes = res;
  });
}
}
