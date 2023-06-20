import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  heroes: Hero[] = [];

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
    //? ELEMENTI RANDOM DELL'ARRAY EROI
  }

  /* getRandomHeroes(array: Hero[]): Hero[] {
    let randomArray: Hero[] = [];
    for (let i = 0; i < 5; i++) {
      let random = Math.floor(Math.random() * array.length);
      randomArray.push(array[random]);
      array.splice(random, 1)
    }
    return randomArray;
  } */
}
