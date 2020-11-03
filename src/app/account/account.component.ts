import { AccountService } from './../service/account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from '../service/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public account;
  public form: FormGroup;
  public alert = false;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.account = this.accountService.account;
    this.buidForm();
  }

  buidForm() {
    this.form = this.formBuilder.group({
      name: [''],
      address: [''],
      phone: ['']
    });
  }


  saveAccount() {
    const data = this.form.value;
    this.firebase.saveAccount(data, this.account.key)
    .then((res) => {
      console.log('account', data);
      this.router.navigateByUrl('/dashboard');
    });
  }
}

