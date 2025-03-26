import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '',
    loadComponent: () => import('./features/phone/phone-list/phone-list.component').then(m => m.PhoneListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./features/phone/phone-form/phone-form.component').then(m => m.PhoneFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./features/phone/phone-form/phone-form.component').then(m => m.PhoneFormComponent)
  },
  {
    path: 'view/:id',
    loadComponent: () => import('./features/phone/phone-form/phone-form.component').then(m => m.PhoneFormComponent)
  }
];