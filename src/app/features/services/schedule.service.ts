import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Schedule } from '../schedule.model';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  private base = `${environment.apiUrl}/schedules`;
  constructor(private http: HttpClient) {}

  getSchedules(page = 1, limit = 5): Observable<{ schedules: Schedule[], total: number }> {
    return this.http.get<{ schedules: Schedule[], total: number }>(`${this.base}?page=${page}&limit=${limit}`);
  }

  getSchedule(id:string): Observable<{schedule: Schedule[]}> {
    return this.http.get<{ schedule: Schedule[]}>(`${this.base}/${id}`);
  }

  create(payload: Partial<Schedule>) {
    return this.http.post<Schedule>(this.base, payload);
  }

  update(id: string, changes: Partial<Schedule>) {
    return this.http.put<Schedule>(`${this.base}/${id}`, changes);
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
