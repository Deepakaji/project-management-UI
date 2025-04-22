import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AppSideLoginComponent } from './pages/authentication/side-login/side-login.component';
import { AuthGuard } from './shared/auth.guard';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AppSideLoginComponent,
      },
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: 'app',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
