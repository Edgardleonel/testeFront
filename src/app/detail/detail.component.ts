import { AccountService } from './../service/account.service';
import { User } from './../interfaces/user';
import { FavoriteService } from './../service/favorite.service';
import { MapService } from './../service/map.service';
import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
public account;
public user = {
  id: '',
  name: '',
  phone: '',
  website: '',
  company: {
    name: ''
  },
  address: {
    geo: {
      lat: '',
      lng: '',
    },
  }
};


constructor(
  private api: ApiService,
  private route: ActivatedRoute,
  private mapService: MapService,
  private favoriteService: FavoriteService,
  private accountService: AccountService
) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.api.getUser(id).subscribe((res) => {
      res.favorite = this.favoriteService.listFavorites.filter((res: User) => res.id === id && res.favorite === true).length ? true : false;
      this.user = res;
      console.log('user', this.user);
      this.mapService.buildMap(res.address.geo.lng, res.address.geo.lat);
    });

    this.account = this.accountService.account;
  }
}
