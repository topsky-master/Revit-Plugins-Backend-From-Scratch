// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';

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
				path: '',
				loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then((m) => m.AdminLayoutModule)
			}],
      canActivate: [AuthGuard]
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
