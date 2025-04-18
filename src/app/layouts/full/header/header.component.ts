import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { BrandingComponent } from '../sidebar/branding.component';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    BrandingComponent,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {

  @Input() userRole: string = '';
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  userName: string = '';
  notifications = [
    { message: "New Projects Added", type: "info", time: "2 min ago" },
    { message: "HRMS Project Completed", type: "success", time: "10 min ago" },
    { message: "Stock Project Dedline Ends", type: "warning", time: "1 hour ago" },
  ];

  constructor(private router: Router,private authService:AuthService) {}

ngOnInit(): void {
  this.userRole = this.authService.getUserRole();
}

  getNotificationIcon(type: string): string {
    switch (type) {
      case "info":
        return "info";
      case "success":
        return "check_circle";
      case "warning":
        return "warning";
      default:
        return "notifications";
    }
  }

  removeNotification(index: number) {
    this.notifications.splice(index, 1);
  }

  clearNotifications() {
    this.notifications = [];
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/authentication/login']).then(() => {
      window.location.reload();
    });
  }

}
