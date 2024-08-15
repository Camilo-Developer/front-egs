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
export class StatesService {

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

  getStates(): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get<any>(`${environment.apiUrl}admin/states`, { headers: headers });
  }
  createState(stateData:any):Observable<any> {
    const headers = this.setHeaders();
    return this.http.post<any>(`${environment.apiUrl}admin/states`, stateData, { headers: headers });
  }
  updateState(id: number, stateData: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.put<any>(`${environment.apiUrl}admin/states/${id}`, stateData, { headers: headers });
  }
  deleteState(id: number): Observable<any> {
    const headers = this.setHeaders();
    return this.http.delete<any>(`${environment.apiUrl}admin/states/${id}`, { headers: headers });
  }
}
