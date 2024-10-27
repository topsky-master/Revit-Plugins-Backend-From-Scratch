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
      { 
        path: 'product/add',
        loadChildren: () => import('./pages/product/add-edit/add-edit.module').then(m => m.ProductAddEditModule)
      },
      { 
        path: 'product/edit/:_id',
        loadChildren: () => import('./pages/product/add-edit/add-edit.module').then(m => m.ProductAddEditModule)
      },
      { 
        path: 'file',
        loadChildren: () => import('./pages/file/list/list.module').then(m => m.FileListModule)
      },
      { 
        path: 'file/add',
        loadChildren: () => import('./pages/file/add-edit/add-edit.module').then(m => m.FileAddEditModule)
      },
      { 
        path: 'file/edit/:_id',
        loadChildren: () => import('./pages/file/add-edit/add-edit.module').then(m => m.FileAddEditModule)
      },
    
      { 
        path: 'device',
        loadChildren: () => import('./pages/device/list/list.module').then(m => m.DeviceListModule)
      },
      { 
        path: 'device/edit/:_id',
        loadChildren: () => import('./pages/device/add-edit/add-edit.module').then(m => m.DeviceAddEditModule)
      },
    
      { 
        path: 'subscription',
        loadChildren: () => import('./pages/subscription/list/list.module').then(m => m.SubscriptionListModule)
      },
      { 
        path: 'subscription/edit/:_id',
        loadChildren: () => import('./pages/subscription/add-edit/add-edit.module').then(m => m.SubscriptionAddEditModule)
      },
    
      { 
        path: 'user',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      },
      { 
        path: 'user/add',
        loadChildren: () => import('./pages/user/add-edit/add-edit.module').then(m => m.UserAddEditModule)
      },
      { 
        path: 'user/edit/:id',
        loadChildren: () => import('./pages/user/add-edit/add-edit.module').then(m => m.UserAddEditModule)
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
