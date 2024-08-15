import { Injectable,NgModule } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@NgModule({
  imports: [
    HttpClientModule,
  ],
})
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

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

  getDashboard(): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get<any>(`${environment.apiUrl}admin/dashboard`, { headers: headers });
  }
}
