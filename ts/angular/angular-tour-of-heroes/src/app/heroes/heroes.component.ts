import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: any;

  constructor() {
    this.hero = {
      id: 1,
      name: 'Windstorm',
    };
  }

  ngOnInit(): void {
  }
}
