import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AuthFirebaseService } from '../service/auth-firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
@Input() accountName;
  constructor(private auth: AuthFirebaseService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

}
