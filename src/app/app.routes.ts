import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'add-annonce',
    loadComponent: () => import('./add-annonce/add-annonce.page').then( m => m.AddAnnoncePage)
  },
  {
    path: 'list-annonce',
    loadComponent: () => import('./list-annonce/list-annonce.page').then( m => m.ListAnnoncePage)
  },
];
