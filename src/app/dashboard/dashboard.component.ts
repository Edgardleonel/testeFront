import { AccountService } from './../service/account.service';
import { FirebaseService } from './../service/firebase.service';
import { FavoriteService } from './../service/favorite.service';
import { ApiService } from '../service/api.service';
import { Component, OnInit } from '@angular/core';
import { arrayNoRepeat } from '../util';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
public users;
private favorites;
public accountName;

  constructor(
    private api: ApiService,
    private favoriteService: FavoriteService,
    private firebase: FirebaseService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.getFirebaseByUser();
  }

  getFirebaseByUser() {
    this.firebase.getFavorites()
    .subscribe((obj) => {
      this.favorites = obj;
      this.favorites = this.favorites.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
      this.favorites.sort(function (a, b) {
        return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);
      });
      const userStorage = localStorage.getItem('user');
      const userJson = JSON.parse(userStorage);
      this.favorites = this.favorites.filter(res => res.key_user === userJson.key);
      this.accountService.accountName = userJson.name;
      this.accountService.account = userJson;
      this.accountName = userJson.name;
      this.getUsers(this.favorites, userJson.key);
    });
  }

  getUsers(favorites, key) {
    if (favorites.length > 0) {
      this.users = favorites;
      this.favoriteService.listFavorites = favorites.filter(res => res.favorite === true);
    } else {
      this.api.getUsers().subscribe((res) => {
        this.users = res;
        this.users = this.users.map(user => ({...user, key_user: key , favorite: false}));
        arrayNoRepeat(this.users).forEach(element => {
          this.firebase.createFavorite(element);
        });
      });
    }
  }
}
