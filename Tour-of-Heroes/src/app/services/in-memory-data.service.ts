import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const heroes = [
      { id: 1, name: 'Sun Tzu' },
      { id: 2, name: 'William Wallace' },
      { id: 3, name: 'Harriet Tubman' },
      { id: 4, name: 'El Cid' },
      { id: 5, name: 'Florence Nightingale' },
      { id: 6, name: 'Genghis Khan' },
      { id: 7, name: "Giovanna d'Arco" },
      { id: 8, name: 'Simón Bolívar' },
      { id: 9, name: 'Subutai' },
      { id: 10, name: 'Boudica' },
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 1;
  }
}
