import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export interface Td {
  id: number;
  titre: string;
  date: string; // ou LocalDate selon votre format
  fichier: Blob; // Utilisez Blob si vous souhaitez manipuler le fichier en tant que BLOB
}

//--------class message---------
export interface Message {
  id: number;
  nom: string;
  prenom: string;
  date: string;  // ou LocalDate selon votre backend
  time:string;
  message: string;
  id_reponse: number | null;
}

export interface Reponse {
  id: number;
  nom: string;
  prenom: string;
  date: string;  // ou LocalDate selon votre backend
  contenu: string;
  idMessage: number | null;
}
@Injectable({
  providedIn: 'root'
})
export class BackendserviceService {
readonly API_URL =   'https://databasecti.onrender.com';
  readonly ENDPOINT_CLE = "/cle";
 // readonly API_URL = "http://localhost:8080";
  readonly ENDPOINT_MESSAGES = "/messages";
  readonly SUP_MESSAGE = "/message";
  readonly ENDPOINT_REPONSES = "/reponses";
  readonly SUP_REPONSE = "/reponse";

  constructor(private httpClient: HttpClient) { }
//---------------------------------cle-----------------------------------------------------
  // Récupérer une clé par ID
  getCle(id: number): Observable<Cle> {
    return this.httpClient.get<Cle>(`${this.API_URL + this.ENDPOINT_CLE}/${id}`);
  }

    // Mettre à jour une clé
    updateCle(id: number, cle: Cle): Observable<Cle> {
      return this.httpClient.put<Cle>(`${this.API_URL}${this.ENDPOINT_CLE}/${id}`, cle);
    }

  // Supprimer une clé par ID
  deleteCle(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL + this.ENDPOINT_CLE}/${id}`);
  }

  //----------------------------------message------------------------------------------------------------------
  // Récupérer tous les messages
  getMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.API_URL + this.ENDPOINT_MESSAGES);
  }

  // Ajouter un nouveau message
  addMessage(message: Message): Observable<Message> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Message>(this.API_URL + this.ENDPOINT_MESSAGES, message, { headers });
  }

  // Vérifier la connexion avec le serveur
  checkServerConnection(): Observable<any> {
    return this.httpClient.get(this.API_URL + this.ENDPOINT_MESSAGES);

  }
  // Sauvegarder un message
  saveMessage(message: Message): Observable<Message> {
    return this.httpClient.post<Message>(this.API_URL + this.ENDPOINT_MESSAGES, message);
  }
  // Supprimer un message par ID
  deleteMessage(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL + this.SUP_MESSAGE}/${id}`);
  }
   // get un message par ID
  getMessageById(id: number): Observable<Message> {
    return this.httpClient.get<Message>(`${this.API_URL+this.SUP_MESSAGE}/${id}`);
  }
  //-----------------------------------reponse----------------------------------------------------------------
  // Récupérer toutes les réponses
  getReponses(): Observable<Reponse[]> {
    return this.httpClient.get<Reponse[]>(this.API_URL + this.ENDPOINT_REPONSES);
  }
  // Ajouter une nouvelle réponse
  addReponse(reponse: Reponse): Observable<Reponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Reponse>(this.API_URL + this.SUP_REPONSE, reponse, { headers });
  }
  // Supprimer une réponse par ID
  deleteReponse(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL + this.SUP_REPONSE}/${id}`);
  }
  // Obtenir une réponse par ID
  getReponseById(id: number): Observable<Reponse> {
    return this.httpClient.get<Reponse>(`${this.API_URL + this.SUP_REPONSE}/${id}`);
  }
  // Mettre à jour une réponse
  updateReponse(reponse: Reponse): Observable<Reponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<Reponse>(`${this.API_URL + this.SUP_REPONSE}/${reponse.id}`, reponse, { headers });
  }
  deleteReponsesByMessageId(idMessage: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/reponse/message/${idMessage}`);
  }

//-------------------------------cour---------------------------------

// Méthode pour télécharger un cours
uploadCour(formData: FormData): Observable<any> {
  return this.httpClient.post(`${this.API_URL}/cour/upload`, formData);
}

// Récupérer tous les messages
getCours(): Observable<Cour[]> {
  return this.httpClient.get<Cour[]>(`${this.API_URL}/cours`);
}

// Méthode pour supprimer un cours
deleteCour(id: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.API_URL}/cour/sup/${id}`);
}
//-------------------------------td---------------------------------
// Méthode pour télécharger un TD
uploadTd(formData: FormData): Observable<any> {
  return this.httpClient.post(`${this.API_URL}/td/upload`, formData);
}

// Récupérer tous les TD
getTds(): Observable<Td[]> {  // Assurez-vous d'avoir une interface Td
  return this.httpClient.get<Td[]>(`${this.API_URL}/tds`); // Changez le chemin si nécessaire
}

// Méthode pour supprimer un TD
deleteTd(id: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.API_URL}/td/sup/${id}`); // Changez le chemin si nécessaire
}

}

//---------------------------------chargement-----------------------------------------
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
