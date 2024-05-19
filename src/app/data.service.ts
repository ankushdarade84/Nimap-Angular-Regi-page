import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Users } from './models/Users';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/users'; // JSON Server URL
  // private apiUrl = '/users';
  constructor(private httpClient: HttpClient) {}



  getUserById(userId: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${userId}`);
  }
  
  updateUser(id: string, userData: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${id}`, userData);
  }
  
  saveRegistration(users: Users): Observable<any>{
    return this.httpClient.post(this.apiUrl, users).pipe(
      catchError(this.handleError)
    );
  }

  getContacts(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }


  updateProfilePhoto(userId: string, photoData: any): Observable<any> {
    const formData = new FormData();
    formData.append('profilePhoto', photoData);
    return this.httpClient.put(`${this.apiUrl}/users/${userId}/profilePhoto`, formData);
  }

  
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  private user: any;
  private userIdSource = new BehaviorSubject<string | null>(null);
  currentUserId = this.userIdSource.asObservable();

  userIdEmitter: EventEmitter<string> = new EventEmitter();

  emitUserId(userId: string) {
    this.userIdEmitter.emit(userId);
  }

  setUser(user: any): void {
    this.user = user;
  }

  getUser(): any {
    return this.user;
  }

  private userId: any;

  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }

}
