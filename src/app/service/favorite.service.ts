import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  public listFavorites: Array<Object>;

  constructor() {
    this.listFavorites = [];
  }
}
