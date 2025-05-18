import { Routes } from '@angular/router';
import { authGuard, publicGuard, writerGuard } from './shared/guards/auth.guard';


export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        canActivate: [publicGuard]
    },
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent),
        canActivate: [publicGuard]
    },
    {
        path: 'group/:groupId',
        loadComponent: () => import('./pages/group/group.component').then(m => m.GroupComponent)
        
    },
    {
        path: 'post/:postId',
        loadComponent: () => import('./pages/post/post.component').then(m => m.PostComponent)
        
    },
    {
        path: 'new-post/:groupId',
        loadComponent: () => import('./pages/new-post/new-post.component').then(m => m.NewPostComponent),
        canActivate: [writerGuard]
    },
    {
        path: 'edit-post/:postId',
        loadComponent: () => import('./pages/edit-post/edit-post.component').then(m => m.EditPostComponent),
        canActivate: [writerGuard]
    },
    {
        path: 'stat',
        loadComponent: () => import('./pages/stat/stat.component').then(m => m.StatComponent),
        canActivate: [writerGuard]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./shared/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
    },
];
