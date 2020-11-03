import { FirebaseService } from './../service/firebase.service';
import { User } from './../interfaces/user';
import { FavoriteService } from './../service/favorite.service';
import { Component, OnInit, Input } from '@angular/core';
import { arrayNoRepeat } from '../util';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
@Input() users;
public favorite;

  constructor(private favoriteService: FavoriteService, private route: ActivatedRoute, private firebase: FirebaseService) { }

  ngOnInit(): void {
  }

  adFavorite(user) {
    user.favorite = true;
    this.favoriteService.listFavorites.push(user);
    this.favoriteService.listFavorites = this.favoriteService.listFavorites
    .filter((res: User) => res.favorite === true);
    console.log('list', this.favoriteService.listFavorites);
    this.firebase.saveFavorites(user, user.key);
  }

  delFavorite(user) {
    user.favorite = false;
    this.favoriteService.listFavorites = this.favoriteService.listFavorites
    .filter((res: User) => res.id !== user.id && res.favorite === true);
    if (this.route.snapshot.routeConfig.path === 'favorite') {
      this.users = this.favoriteService.listFavorites;
      this.users = arrayNoRepeat(this.users);
    }
    console.log('list', this.favoriteService.listFavorites);
    this.firebase.saveFavorites(user, user.key);
  }

}
