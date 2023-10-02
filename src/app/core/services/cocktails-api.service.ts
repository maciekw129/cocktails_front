import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpWithMessage } from '@app/shared/services/http-with-message';
import { Cocktail, CocktailsApi } from '@app/core/model/cocktails.model';
import { API_URL } from '@app/env.token';
import { Observable } from 'rxjs';
import { Filters } from '@app/modules/home/home.model';

@Injectable({ providedIn: 'root' })
export class CocktailsApiService {
  private http = inject(HttpClient);
  private httpWithMessage = inject(HttpWithMessage);
  private readonly API_URL = inject(API_URL);

  private readonly COCKTAILS_URL = `${this.API_URL}/cocktails`;

  public getCocktail(cocktailId: string): Observable<Cocktail> {
    return this.http.get<Cocktail>(`${this.COCKTAILS_URL}/${cocktailId}`);
  }

  public getAllCocktails(params?: Partial<Filters>): Observable<CocktailsApi> {
    return this.http.get<CocktailsApi>(`${this.COCKTAILS_URL}`, {
      params,
    });
  }

  public createCocktail(
    cocktail: Omit<Cocktail, 'id' | 'author'>
  ): Observable<CocktailsApi> {
    return this.httpWithMessage.post<CocktailsApi>(
      `${this.COCKTAILS_URL}`,
      'You successfully created new cocktail!',
      cocktail
    );
  }
}
