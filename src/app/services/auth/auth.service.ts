import { Injectable,NgModule } from '@angular/core';
import { HttpClient,HttpClientModule,HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@NgModule({
  imports: [
    HttpClientModule,
  ],
})
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';
  userToken: any;
  user = '';
  permissionsGet:any;
  rolesGet:any;
  constructor(private http: HttpClient,private router: Router) {
   }

  login(credentials: { loginname: string, password: string }) {
    return this.http.post<any>(`${environment.apiUrl}login`, credentials).pipe(
      map(res => {
        this.saveToken(res.access_token);
        this.saveUser(res.user);
        this.savePermissions(res.permissions);
        this.saveRoles(res.rol);
        location.reload();
        return true;
      })
    );
  }

  register(user: { name: string,lastname: string, email: string, loginname: string, password: string,password_confirmation:string }) {
    return this.http.post<any>(`${environment.apiUrl}register`, user).pipe(
      map(res => {
        console.log(res);
        this.saveToken(res.acces_token);
        this.saveUser(res.user);
        return true;
      })
    )
  }

  logout(token: string): Observable<any> {
    const tokend = this.readToken();
    if (tokend) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + tokend
      });
      return this.http.post<any>(`${environment.apiUrl}logout`, token,{ headers: headers });
    } else{
      return this.http.get(`${environment.apiUrl}login`);
    }
  }

  saveToken(token: any) {
    this.userToken = token;
    this.sessionSet('userToken', token);
  }
  saveUser(user: any) {
    this.user = user;
    this.sessionSet('user', user);
  }

  savePermissions(permissions: any) {
    this.permissionsGet = permissions;
    this.sessionSet('permissions', permissions);
  }

  saveRoles(rol: any) {
    this.rolesGet = rol;
    this.sessionSet('rol', rol);
  }

  readToken() {
    if (this.sessionGet('userToken')) {
      this.userToken = this.sessionGet('userToken');
    } else {
      this.userToken = null;
    }
    return this.userToken;
  }

  isAuthenticated(): boolean {
    return this.readToken() != null;
  }

  sessionGet(key:any) {
    let stringValue = window.sessionStorage.getItem(key)
      if (stringValue !== null) {
        let value = JSON.parse(stringValue)
          let expirationDate = new Date(value.expirationDate)
          if (expirationDate > new Date) {
            this.sessionSet(key,value.value);
            return value.value
          } else {
            window.sessionStorage.removeItem(key)
            this.router.navigate(['/']);
  
          }
      }
      return null
  }
  
  sessionSet(key: any, value: any, expirationInMin = 15) {
    let expiration = expirationInMin;
    if (expirationInMin == 0) {
      expiration = 1440;
    }
    let expirationDate = new Date(new Date().getTime() + (60000 * expiration));
    let newValue = {
      value: value,
      expirationDate: `${expirationDate.getFullYear()}-${('0' + (expirationDate.getMonth() + 1)).slice(-2)}-${('0' + expirationDate.getDate()).slice(-2)}T${('0' + expirationDate.getHours()).slice(-2)}:${('0' + expirationDate.getMinutes()).slice(-2)}:${('0' + expirationDate.getSeconds()).slice(-2)}`
    };
    window.sessionStorage.setItem(key, JSON.stringify(newValue));
  }



  //Funciones para los permisos

  //Obtiene los roles del usuario autenticado
  getRoles(): Observable<any> {
    return of(JSON.parse(sessionStorage.getItem('rol') ?? '[]'));
  }

  //Obtiene los permisos del usuario autenticado
  hasPermission(permission: string): boolean  {
    const permi = sessionStorage.getItem('permissions');
    
    if (permi) {
        const permissions = JSON.parse(permi).value;
        console.log(permissions);
        return permissions.includes(permission);
    }

    return false;
  }
}
