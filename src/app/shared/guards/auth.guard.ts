import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';
import { UserService } from '../services/user.service';

export const writerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.getLoggedInUser().pipe(
    take(1),
    map(user => {
      if (user && user.role === "writer") {
        return true;
      }
      router.navigate(['/home']);
      return false;
    })
  )
};

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      }

      router.navigate(['/login']);
      return false;
    })
  );
};

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (!user) {
        return true;
      }
      
      router.navigate(['/home']);
      return false;
    })
  );
};