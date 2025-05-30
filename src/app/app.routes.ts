import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('../pages/home/home.page').then(module => module.HomePage) },
    { path: 'service', loadComponent: () => import('../pages/service/service.page').then(module => module.servicePage)},
    { path: 'booking', loadComponent: () => import('../pages/booking/booking.page').then(module => module.bookingPage) },
    { path: 'add', loadComponent: () => import('../pages/addService/addService.page').then(module => module.addServicePage) },
    { path: 'login', loadComponent: () => import('../pages/registerLogin/registerLogin.page').then(module => module.RegisterLoginPage) },
    { path: 'profile', loadComponent: () => import('../pages/profile/profile.page').then(module => module.profilePage) },
];
