import { AccountService } from './../service/account.service';
import { FavoriteService } from './../service/favorite.service';
import { Component, OnInit, Input } from '@angular/core';
import { arrayNoRepeat } from '../util';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  public users;
  public account;

  constructor(private favoriteService: FavoriteService, private accountService: AccountService) { }

  ngOnInit(): void {
      this.users = arrayNoRepeat(this.favoriteService.listFavorites);
      this.account = this.accountService.account;
  }

}
