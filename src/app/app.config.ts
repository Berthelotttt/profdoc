/*import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Routes, withRouterConfig } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AcceuilleComponent } from './acceuille/acceuille.component';
import { AdminComponent } from './admin/admin.component';
import { AdminReseauComponent } from './admin_reseau/admin_reseau.component';
import { EmployeComponent } from './employe/employe.component';
import { TechnicienComponent } from './technicien/technicien.component';

const routes: Routes = [
  { path: '', redirectTo: 'acceuille', pathMatch: 'full' },
  { path: 'acceuille', component: AcceuilleComponent },
  { path: 'technicien/:id', component: TechnicienComponent },
  { path: 'employe/:id', component: EmployeComponent },
  { path: 'admin/:id', component: AdminComponent },
   { path: 'admin_reseau/:id', component: AdminReseauComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    importProvidersFrom(BrowserAnimationsModule, MatProgressSpinnerModule, FormsModule), // Déplacez ici les modules
    provideClientHydration(withEventReplay()),
  ],
};*/


import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Routes, withRouterConfig } from '@angular/router';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AcceuilleComponent } from './acceuille/acceuille.component';
import { AdminComponent } from './admin/admin.component';
import { AdminReseauComponent } from './admin_reseau/admin_reseau.component';
import { EmployeComponent } from './employe/employe.component';
import { TechnicienComponent } from './technicien/technicien.component';

const routes: Routes = [
  { path: '', redirectTo: 'acceuille', pathMatch: 'full' },
  { path: 'acceuille', component: AcceuilleComponent },
  { path: 'technicien/:id', component: TechnicienComponent },
  { path: 'employe/:id', component: EmployeComponent },
  { path: 'admin/:id', component: AdminComponent },
  { path: 'admin_reseau/:id', component: AdminReseauComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    importProvidersFrom(BrowserAnimationsModule, MatProgressSpinnerModule, FormsModule),
    provideClientHydration(withEventReplay()),
  ],
};
