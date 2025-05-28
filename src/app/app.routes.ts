import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', loadComponent: () => import('../pages/home/home.page').then(module => module.HomePage) },
    { path: 'services', loadComponent: () => import('../pages/services/services.page').then(module => module.ServicesPage) },

];
