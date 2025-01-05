// src/app/app.config.ts
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Routes, withRouterConfig } from '@angular/router';
import { AcceuilleComponent } from './acceuille/acceuille.component';
import { HomeComponent } from './home/home.component'; // Importez HomeComponent
import { ReponseComponent } from './reponse/reponse.component';

export const routes: Routes = [
  { path: '', redirectTo: 'acceuille', pathMatch: 'full' },  // Redirection vers /acceuille
  { path: 'acceuille', component: AcceuilleComponent },  // Route pour AcceuilleComponent
  { path: 'home', component: HomeComponent },  // Ajoutez la route pour HomeComponent
  { path: 'reponse', component: ReponseComponent  },
  // Ajoutez d'autres routes si nécessaire
];

export const appConfig = {
  providers: [
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),  // Recharger la route
    provideHttpClient(),
    importProvidersFrom(BrowserAnimationsModule)
  ],
  imports: [
    MatProgressSpinnerModule,
    FormsModule,
  ],
};
