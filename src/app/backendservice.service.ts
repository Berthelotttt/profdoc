import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// Interface pour l'objet Cle
export interface Cle {
  id: number;
  valeur: string;
}
export interface Cour {
  id: number;
  titre: string;
  date: string; // ou LocalDate selon votre format
  fichier: Blob; // Utilisez Blob si vous souhaitez manipuler le fichier en tant que BLOB
}
@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {
  readonly API_URL = "http://localhost:8080";
  readonly ENDPOINT_CLE = "/cle";
  private baseUrl = 'https://databasecti.onrender.com';
  constructor(private httpClient: HttpClient) { }

  // Récupérer une clé par ID
  getCle(id: number): Observable<Cle> {
    return this.httpClient.get<Cle>(`${this.API_URL + this.ENDPOINT_CLE}/${id}`);
  }

  // Mettre à jour une clé
  updateCle(id: number,cle: Cle): Observable<Cle> {
    return this.httpClient.put<Cle>(`${this.API_URL + this.ENDPOINT_CLE}/${id}`, cle);
  }

  // Supprimer une clé par ID
  deleteCle(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL + this.ENDPOINT_CLE}/${id}`);
  }
//-------------------------------cour---------------------------------

// Méthode pour télécharger un cours
uploadCour(formData: FormData): Observable<any> {
  return this.httpClient.post(`${this.baseUrl}/cour/upload`, formData);
}

// Récupérer tous les messages
getMessages(): Observable<Cour[]> {
  return this.httpClient.get<Cour[]>(`${this.baseUrl}/cours`);
}

// Méthode pour supprimer un cours
deleteCour(id: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.baseUrl}/cour/sup/${id}`);
}

}

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}
