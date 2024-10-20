// account-details.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DocumentType, Gender } from '../pages/inicio/components/account-details/models/account-detail.model';

@Injectable({
  providedIn: 'root',
})
export class AccountDetailsService {
  private apiKey = environment.apiKey;
  private apiUrl = `${environment.apiUrl}signup/`;

  constructor(private http: HttpClient) {}

  getGenders(): Observable<Gender[]> {
    return this.http
      .get<Gender[]>(`${this.apiUrl}genders?apiKey=${this.apiKey}`)
      .pipe(
        catchError((error) => {
          console.error('Error al cargar géneros:', error);
          return of([
            { value: 'F', viewValue: 'Femenino' },
            { value: 'M', viewValue: 'Masculino' },
          ]);
        })
      );
  }

  getDocumentTypes(): Observable<DocumentType[]> {
    return this.http
      .get<DocumentType[]>(`${this.apiUrl}documentTypes?apiKey=${this.apiKey}`)
      .pipe(
        catchError((error) => {
          console.error('Error al cargar tipos de documento:', error);
          return of([
            { value: 'TI', viewValue: 'Tarjeta de Identidad' },
            { value: 'CC', viewValue: 'Cédula de Ciudadanía' },
            { value: 'CE', viewValue: 'Cédula de Extranjería' },
          ]);
        })
      );
  }
}
