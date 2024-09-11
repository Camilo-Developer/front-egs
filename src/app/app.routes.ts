import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

//Guards
import { authGuard } from './guards/auth/auth.guard';
import { offAuthGuard } from './guards/offAuth/off-auth.guard';

//Services
import { AuthService } from './services/auth/auth.service';
import { ProfileService } from './services/profile/profile.service';
import { DashboardService } from './services/admin/dashboard/dashboard.service';
import { StatesService } from './services/admin/states/states.service';
import { ProductsService } from './services/admin/products/products.service';
import { RolesService } from './services/admin/roles/roles.service';


//Components
import { LoginComponent } from './components/auth/login/login.component';
//import { RegisterComponent } from './components/auth/register/register.component'; 
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile/profile.component'; 
import { StatesComponent } from './components/admin/states/states.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { RolesIndexComponent } from './components/admin/roles/roles-index/roles-index.component';
import { RolesCreateComponent } from './components/admin/roles/roles-create/roles-create.component';
import { RolesUpdateComponent } from './components/admin/roles/roles-update/roles-update.component';
import { RolesShowComponent } from './components/admin/roles/roles-show/roles-show.component';
import { ExcelIndexComponent } from './components/admin/excel/excel-index/excel-index.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', providers: [AuthService,HttpClient],component: LoginComponent, canActivate: [offAuthGuard]},
  //{ path: 'register',providers: [AuthService,HttpClient], component: RegisterComponent,  canActivate: [offAuthGuard]},
  { path: 'admin/dashboard',   providers: [AuthService,HttpClient], component: DashboardComponent, canActivate:[authGuard]},
  { path: 'profile',   providers: [ProfileService,AuthService,HttpClient], component: ProfileComponent, canActivate:[authGuard]},
  { path: 'admin/states',   providers: [StatesService,AuthService,HttpClient], component: StatesComponent, canActivate:[authGuard]},
  { path: 'admin/products',   providers: [ProductsService,AuthService,HttpClient], component: ProductsComponent, canActivate:[authGuard]},
  { path: 'admin/roles',   providers: [RolesService,AuthService,HttpClient], component: RolesIndexComponent, canActivate:[authGuard]},
  { path: 'admin/roles/create',   providers: [RolesService,AuthService,HttpClient], component: RolesCreateComponent, canActivate:[authGuard]},
  { path: 'admin/roles/update/:id',   providers: [RolesService,AuthService,HttpClient], component: RolesUpdateComponent, canActivate:[authGuard]},
  { path: 'admin/roles/show',   providers: [RolesService,AuthService,HttpClient], component: RolesShowComponent, canActivate:[authGuard]},
  { path: 'admin/export',   providers: [AuthService,HttpClient], component: ExcelIndexComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutes { }