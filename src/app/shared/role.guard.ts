import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(){
    if (this.authService.isHavAccess()) {
      return true
    } else {
      this.router.navigate(['/app/dashboard']);
      return false;
    }
  }
}
