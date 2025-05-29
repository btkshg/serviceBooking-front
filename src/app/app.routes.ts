import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', loadComponent: () => import('../pages/home/home.page').then(module => module.HomePage) },
    { path: 'service', loadComponent: () => import('../pages/service/service.page').then(module => module.servicePage)},
    { path: 'addservice', loadComponent: () => import('../pages/addService/addService.page').then(module => module.addServicePage)}
];
