// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';

const routes: Routes = [
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
      }
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
