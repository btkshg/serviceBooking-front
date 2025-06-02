import { Routes } from '@angular/router';

// Here we define the possible routes of the app
export const routes: Routes = [
    // Default home page
    { path: '', loadComponent: () => import('../pages/home/home.page').then(module => module.HomePage) },
    // When the service clicked it sends to service page. No dynamic id needed, because datas send through route and our db has only one booking table for every services.
    { path: 'service', loadComponent: () => import('../pages/service/service.page').then(module => module.servicePage)},
    // When the service succesfully booked, it sends to booking page, similarly no dynamic id needed.
    { path: 'booking', loadComponent: () => import('../pages/booking/booking.page').then(module => module.bookingPage) },
    // When admins want to add a new service, it sends to this page
    { path: 'add', loadComponent: () => import('../pages/addService/addService.page').then(module => module.addServicePage) },
    // WHen admins want to update a existing service, it sends to this page with dynamic id. It uses same add page because the logics are the same.
    { path: 'add/:id', loadComponent: () => import('../pages/addService/addService.page').then(module => module.addServicePage) },
    // When user want to sign in or register.
    { path: 'login', loadComponent: () => import('../pages/registerLogin/registerLogin.page').then(module => module.RegisterLoginPage) },
    // For users, if they want to see their infos or previous bookings.
    { path: 'profile', loadComponent: () => import('../pages/profile/profile.page').then(module => module.profilePage) },
];
