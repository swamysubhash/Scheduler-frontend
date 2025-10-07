import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Schedule } from '../schedule.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private base = `${environment.apiUrl}/auth`;

  user = new BehaviorSubject<any>(null);
  user$= this.user.asObservable();
  constructor(private http:HttpClient) { }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  setToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }
  
  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post<Schedule>(this.base+'/login', payload);
  }

  register(body:any): Observable<any> {
    return this.http.post<Schedule>(this.base+'/register', body);
  }

  clearToken(): void {
    sessionStorage.removeItem('authToken');
    this.user.next(null);
  }
  
  setUser(user:any){
    this.user.next(user);
  }

}
