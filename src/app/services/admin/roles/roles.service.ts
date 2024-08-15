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
export class RolesService {

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

  getRoles(): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get<any>(`${environment.apiUrl}admin/roles`, { headers: headers });
  }
  getRolesCreate(): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get<any>(`${environment.apiUrl}admin/roles/create`, { headers: headers });
  }
  createRole(roleData:any):Observable<any> {
    const headers = this.setHeaders();
    return this.http.post<any>(`${environment.apiUrl}admin/roles`, roleData, { headers: headers });
  }
  editRole(id: number):Observable<any> {
    const headers = this.setHeaders();
    return this.http.get<any>(`${environment.apiUrl}admin/roles/${id}/edit`,  { headers: headers });
  }
  updateRole(id: number, roleData: any):Observable<any> {
    const headers = this.setHeaders();
    return this.http.put<any>(`${environment.apiUrl}admin/roles/${id}`, roleData, { headers: headers });
  }
  deleteRole(id: number): Observable<any> {
    const headers = this.setHeaders();
    return this.http.delete<any>(`${environment.apiUrl}admin/roles/${id}`, { headers: headers });
  }
}
