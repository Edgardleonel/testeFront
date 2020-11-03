import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from '../service/firebase.service';
import { AuthFirebaseService } from '../service/auth-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public alert = false;
  private user;

  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private auth: AuthFirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buidForm();
  }

  buidForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    const data = this.form.value;
    console.log('form login', data);
    this.auth.login(data)
    .then((res) => {
      this.getAndSaveCurrentUser(res.user.email);
    }).catch((err) => {
      this.alert = true;
    });
  }

  getAndSaveCurrentUser(email) {
    this.firebase.getCurrentUser(email)
    .subscribe((res) => {
      this.user = res;
      this.user = this.user.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
      this.user = this.user.shift();
      localStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigateByUrl('/dashboard');
    });
  }
}
