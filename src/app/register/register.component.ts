import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from '../service/firebase.service';
import { AuthFirebaseService } from '../service/auth-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public alert = false;

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
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  register() {
    const data = this.form.value;
    console.log('form login', data);
    this.auth.register(data)
    .then((res) => {
      this.firebase.createUser({name: this.form.value.name, email: this.form.value.email});
      this.router.navigateByUrl('/');
    }).catch((err) => {
      this.alert = true;
    });
  }
}
