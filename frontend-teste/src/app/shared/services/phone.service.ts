import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Phone } from '../../models/phone'
import { PaginatedResponse } from '../../models/paginated-response.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PhoneService {
  private apiUrl = 'http://127.0.0.1:8000/api/phones';
  constructor(private http: HttpClient) {}

  getPhones(page: number) {
    return this.http.get<PaginatedResponse<Phone>>(`${this.apiUrl}?page=${page}`);
  }
  getPhone(id: number): Observable<Phone> {
    return this.http.get<Phone>(`${this.apiUrl}/${id}`);
  }
  createPhone(phone: Phone) {
    return this.http.post<Phone>(this.apiUrl, phone);
  }

  updatePhone(id: number, phone: Phone) {
    return this.http.put<Phone>(`${this.apiUrl}/${id}`, phone);
  }

  deletePhone(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}