import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private apiUrl = 'http://localhost:3000/api/companies';

  constructor(private http: HttpClient) {}

  createCompany(companyData: { name: string }): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, companyData).pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Failed to create company. Please try again.');
        return throwError(() => error);
      })
    );
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        alert('Failed to fetch companies. Please try again.');
        return throwError(() => error);
      })
    );
  }
}
