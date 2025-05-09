import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CompanyService } from './company.service';
import { CreateUser, UpdateUser, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';
  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Failed to fetch users. Please try again.');
        return throwError(() => error);
      })
    );
  }

  getUser(user_id: string): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/find`, { params: { user_id } })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Failed to fetch user. Please try again.');
          return throwError(() => error);
        })
      );
  }

  updateUser(user_id: string, data: UpdateUser): Observable<User> {
    return this.http
      .put<User>(`${this.apiUrl}`, data, { params: { user_id } })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert('Failed to update user. Please try again.');
          return throwError(() => error);
        })
      );
  }

  createUser(data: CreateUser): Observable<User> {
    return this.http.post<User>(this.apiUrl, data).pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Failed to create user. Please try again.');
        return throwError(() => error);
      })
    );
  }
}
