import { Routes } from '@angular/router';
import { AcceuilleComponent } from './acceuille/acceuille.component';
import { AdminComponent } from './admin/admin.component';
import { AdminReseauComponent } from './admin_reseau/admin_reseau.component';
import { EmployeComponent } from './employe/employe.component';
import { ResultatComponent } from './resultat/resultat.component';
import { TechnicienComponent } from './technicien/technicien.component';

export const routes: Routes = [
  { path: '', redirectTo: 'acceuille', pathMatch: 'full' },  // Redirection vers /acceuille
  { path: 'acceuille/id', component: AcceuilleComponent },
  { path: 'technicien/:id', component: TechnicienComponent },
  { path: 'employe/:id', component: EmployeComponent },
  { path: 'admin/:id', component: AdminComponent },
  { path: 'admin_reseau/:id', component: AdminReseauComponent }, 
];
