import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', loadComponent: () => import('../pages/home/home.page').then(module => module.HomePage) },
    { path: 'service', loadComponent: () => import('../pages/service/service.page').then(module => module.ServicePage)},
    { path: 'addservice', loadComponent: () => import('../pages/addService/addService.page').then(module => module.addServicePage)},
    { path: 'registerlogin', loadComponent: () => import('../pages/registerLogin/registerLogin.page').then(module => module.RegisterLoginPage) },

];
