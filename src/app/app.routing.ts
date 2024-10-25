// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './layouts/admin-layout/admin-layout.component';

export const AppRoutes: Routes = [
  {
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	},
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((c) => c.DashboardComponent)
      },
      {
        path: 'maps',
        loadComponent: () => import('./pages/maps/maps.component').then((c) => c.MapsComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./pages/notifications/notifications.component').then((c) => c.NotificationsComponent)
      },
      {
        path: 'product',
        loadChildren: () => import('./pages/product/list/list.module').then((c) => c.ProductListModule)
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./pages/user/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./pages/user/register/register.module').then(m => m.RegisterModule)
      }
    ]
  },
	{
		path: '**',
		redirectTo: 'dashboard'
	}
];
