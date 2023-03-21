import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoginService {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (localStorage.getItem("token")) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
