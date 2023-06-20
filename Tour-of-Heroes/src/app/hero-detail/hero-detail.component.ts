import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  /*
  ! 4) Parent-Child Relazione Componenti
  @Input() hero?: Hero; //? TOLTO AL 6)
  */

  hero: Hero | undefined

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private heroService: HeroService
    //? AGGIUNTI AL 6)
  ) {}

  ngOnInit(): void { //? AGGIUNTO AL 6)
    this.getHero();
  }

  getHero(): void { //? AGGIUNTO AL 6)
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService
      .getHero(id)
      .subscribe((heroId) => (this.hero = heroId));
  }

  goBack(): void{ //? AGGIUNTO AL 6)
    this.location.back()
  }

  save(): void{
    if(this.hero){
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack())
    }
  }
}
