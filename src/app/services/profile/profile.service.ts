import { Injectable,NgModule } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@NgModule({
  imports: [
    HttpClientModule,
  ],
})
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  // Método privado para obtener el token y configurar los encabezados
  private setHeaders(): HttpHeaders {
    const stringValue = window.sessionStorage.getItem('userToken');
    if (stringValue !== null) {
      const tokenData = JSON.parse(stringValue);
      const token = tokenData.value;
      return new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
    } else {
      return new HttpHeaders(); 
    }
  }

  // Obtener perfil del usuario
  getProfile(): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get<any>(`${environment.apiUrl}admin/profile`, { headers: headers });
  }

   // Actualizar perfil del usuario
   updateProfile(profileData: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.post<any>(`${environment.apiUrl}admin/profile/update`, profileData, { headers: headers });
  }

  //Actualizar contraseña
  passwordUpdate(passwordData: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.post<any>(`${environment.apiUrl}admin/profile/password-update`, passwordData, { headers: headers });
  }

}
