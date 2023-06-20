import { Injectable } from '@angular/core';
import { Hero } from '../hero';
import { heroes } from '../mock-heroes';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private message: MessageService, private http: HttpClient) {}

  /*
  ! 5) Metodo Sincrono Servizi
 getHeroes(): Hero[] {
    return heroes; // ! CHIAMATA SINCRONA => PRELEVA DATI DA FILE LOCALE
  }
  */

  /*
  ! TOLTO AL 7) SOSTITUITO CON HTTP
  getHeroes(): Observable<Hero[]> {
    const Heroes = of(heroes); //! CHIAMATA ASYNCRONA CON OBSERVABLE
    this.message.add('HeroService: fetched heroes');
    return Heroes;
    ? ATTIVO AL 5)
  }*/

  /*
  ! TOLTO AL 7) SOSTITUITO CON HTTP
    getHero(id: number): Observable<Hero> { //? AGGIUNTO AL 6)
    const hero = heroes.find((hId) => hId.id === id)!;
    this.message.add(`Congrats! Hero ${id} is fetched`);
    return of(hero);
  }
  */

  //* DAL 7)

  private log(message: string) {
    this.message.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'api/heroes';

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('Fetched heroes')), //? TAP???
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
    //! Ritorna sempre un OBSERVABLE prelevato dai componenti.
    //! catchError intercetta un Observable non funzionante e lo invia alla funzione handleError
    //? Questo metodo ritorna un risultato che permette all'applicazione di continuare a lavorare
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`Fetched hero id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`Updated hero id: ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  addHeroes(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Added new hero with ID: ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((deletedHero: Hero) =>
        this.log(`Deleted hero with ID: ${deletedHero.id}`)
      ),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(
          (x) =>
            x.length
              ? this.log(`Founded heroes matching ${term}`)
              : this.log(`No heroes matching with ${term}`),
          catchError(this.handleError<Hero[]>('searchHeroes', []))
        )
      );
  }
}
