import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { heroes } from '../mock-heroes'; //? TOLTO AL 6)
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  /*
  ! 2)
    hero = 'Windstorm'
  ! 2) Dopo import Interfaccia
    hero: Hero = {
    id: 1,
    name: 'Windstorm',
    };
  */

  /*
  ! 3) Direttive Strutturali -> ATTIVE AL 5)
  heroes = HEROES; //? TOLTO AL 5)
  selectedHero?: Hero; //? TOLTO AL 6)

  ? TOLTO METODO AL 6)
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    ? Aggiunto al 5)
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }
  */

  title = 'My Heroes';
  heroes: Hero[] = []; //? Inserito al 5)
  constructor(
    private heroService: HeroService
  ) // private message: MessageService //? TOLTO AL 6)
  {}

  /*
  ! 5) Metodo Sincrono da Servizio
  getHeroes() {
    this.heroes = this.heroService.getHeroes(); //! CHIAMATA SINCRONA => PRELEVA DATI DA FILE LOCALE
    console.log(this.heroes);
  }
  */

  //! 5) Metodo Service Asincrono
  getHeroes() {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    //! CHIAMATA ASYNCRONA CON OBSERVABLE
    console.log(this.heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return;
    this.heroService
      .addHeroes({ name } as Hero)
      .subscribe((hero) => this.heroes.push(hero));
  }
  
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  /*
  !USELESS 6)
  showHero(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(hero.name + ' has been selected!' + ' - ID: ' + hero.id)
    (`${hero.name} has been selected! - ID: ${hero.id}`)
  }
  */

  /*



  */
}
