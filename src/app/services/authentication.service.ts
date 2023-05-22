import { Injectable } from '@angular/core';
import { AppUser } from '../models/user.model';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  users: AppUser[] = [];
  authenticatedUser: AppUser | undefined;

  constructor(private router: Router) {
    this.users.push({
      userId: UUID.UUID(),
      username: 'admin',
      password: 'admin',
      roles: ['ADMIN'],
    });
    this.users.push({
      userId: UUID.UUID(),
      username: 'user',
      password: 'user',
      roles: ['USER'],
    });
  }

  public login(username: string, password: string): Observable<AppUser> {
    let appUser = this.users.find(
      (u) => u.username == username && u.password == password
    );
    if (appUser != undefined) return of(appUser);
    else return throwError(() => new Error('Login failed'));
  }

  public authenticateUser(appUser: AppUser): Observable<boolean> {
    this.authenticatedUser = appUser;
    localStorage.setItem(
      'authUser',
      JSON.stringify({
        username: appUser.username,
        roles: appUser.roles,
        jwt: 'JWT_TOKEN',
      })
    );
    return of(true);
  }

  public hasRole(role: string): boolean {
    return this.authenticatedUser!.roles.includes(role);
  }

  public logout(): boolean {
    this.authenticatedUser = undefined;
    localStorage.removeItem('authUser');
    this.router.navigateByUrl('/login');
    return true;
  }

  public isAuthenticated(): boolean {
    return this.authenticatedUser != undefined;
  }
}
