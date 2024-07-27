import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, Subject, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HandleDataService {

  private baseUrl = 'https://realtime-innovations-be.onrender.com';

  private editEventSubject = new Subject<any>();
  editEvent$ = this.editEventSubject.asObservable();

  constructor(private http: HttpClient) { }

  createItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, item)
      .pipe(catchError(this.handleError));
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/read`)
      .pipe(catchError(this.handleError));
  }

  getItem(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/read/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateItem(id: string, item: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, item)
      .pipe(catchError(this.handleError));
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API call error:', error);
    return throwError('An error occurred; please try again later.');
  }
}
