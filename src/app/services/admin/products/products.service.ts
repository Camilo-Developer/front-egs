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
export class ProductsService {

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
  getProducts(): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get<any>(`${environment.apiUrl}admin/products`, { headers: headers });
  }
  createProduct(productData:any):Observable<any> {
    const headers = this.setHeaders();
    return this.http.post<any>(`${environment.apiUrl}admin/products`, productData, { headers: headers });
  }
  showProduct(id: number): Observable<any> {
    const headers = this.setHeaders();
    return this.http.get<any>(`${environment.apiUrl}admin/products/${id}`, { headers: headers });
  }
  updateProduct(id: number, productData: any): Observable<any> {
    const headers = this.setHeaders();
    return this.http.put<any>(`${environment.apiUrl}admin/products/${id}`, productData, { headers: headers });
  }
  deleteProduct(id: number): Observable<any> {
    const headers = this.setHeaders();
    return this.http.delete<any>(`${environment.apiUrl}admin/products/${id}`, { headers: headers });
  }
}
