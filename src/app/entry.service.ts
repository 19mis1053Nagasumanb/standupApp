import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private apiUrl = 'http://localhost:8080/api/entries'; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  getEntries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addEntry(entry: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, entry);
  }

  deleteEntry(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
