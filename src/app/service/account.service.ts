import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public account: Array<Object>;
  public accountName: Object;

  constructor() {
    this.account = [];
  }
}
