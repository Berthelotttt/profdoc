import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { BackendserviceService, LoadingService, Message, Reponse, } from '../backendservice.service';

@Component({
  standalone: true, // Indique que c'est un composant autonome
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.css'],
  imports: [
     // Importez les modules nécessaires ici
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,CommonModule
  ],
  template: 'passed in {{ data.id }}'
})
export class ReponseComponent implements OnInit {
  message: Message | undefined;
  reponses: Reponse[] = [];
  newReponse: string = ''; // Propriété pour stocker la réponse saisie
  nom: string = '';  // Variables pour stocker le nom et prénom
  prenom: string = '';
  public loading: boolean = false;
  id: number | undefined; // ID récupéré à partir des paramètres de route

  newMessage: string = ''; // Variable pour stocker le nouveau message

  constructor(@Inject(MAT_DIALOG_DATA) public  data:{id: number},public loadingService: LoadingService,private messageService: BackendserviceService, private route: ActivatedRoute) {} // Injectez ActivatedRoute

  ngOnInit(): void {
       // Convertir l'ID en nombre
        this.getMessage(this.data.id);
        this.getReponses(this.data.id); // Récupérer les réponses associées

  }

  // Méthode pour naviguer en arrière
  goBack() {
    console.log('Navigating back...'); // Logique de navigation
  }

  getMessage(id: number): void {
    this.messageService.getMessageById(id).subscribe(
      (data: Message) => {
        this.message = data;

      },
      (error) => {
        console.error('Erreur lors de la récupération du message', error);
      }
    );
  }

  getReponses(id: number): void {
    this.messageService.getReponses().subscribe(
      (data: Reponse[]) => {
        this.reponses = data.filter(reponse => reponse.idMessage === id);
        this.getReponses(id);
      },
      (error) => {
        console.error('Erreur lors de la récupération des réponses', error);
      }
    );
  }

  async sendReponse() {
    console.log(this.newReponse)
    console.log(this.newReponse.trim())
    if (this.newReponse.trim() && this.message) {

      const newReponse: Reponse = {
        id: 0, // L'ID sera généré automatiquement par le backend
        contenu: this.newReponse,
        nom: 'Proffesseur', // Remplacez par le nom de l'utilisateur actuel si disponible
        prenom: this.prenom, // Remplacez par le prénom de l'utilisateur actuel si disponible
        date: new Date().toISOString().split('T')[0], // Date au format ISO
        idMessage: this.message.id,
      };
      this.loadingService.show();
      this.loading = true;
      this.messageService.addReponse(newReponse).subscribe(
        () => {
          this.newReponse = ''; // Réinitialiser le champ de saisie
          this.loadingService.hide();
          this.loading = false;

        },
        (error) => {
          console.error('Erreur lors de l\'envoi de la réponse', error);
          this.loadingService.hide();
          this.loading = false;
        }
      );
    }
  }
  deleteReponses(idMessage: number): void {
    this.messageService.deleteMessage(idMessage).subscribe(
      () => {
        console.log('mmssg supprimées avec succès');
        // Mettez à jour votre interface utilisateur ici, par exemple en supprimant le message ou en rafraîchissant la liste
      },
      (error) => {
        console.error('Erreur lors de la suppression des mssg', error);
      }
    );
    this.messageService.deleteReponsesByMessageId(idMessage).subscribe(
      () => {
        console.log('Réponses supprimées avec succès');
        // Mettez à jour votre interface utilisateur ici, par exemple en supprimant le message ou en rafraîchissant la liste
      },
      (error) => {
        console.error('Erreur lors de la suppression des réponses', error);
      }
    );
    this.getMessage(this.data.id);
    this.getReponses(this.data.id)
  }

  // Méthode pour obtenir l'heure actuelle
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} PM`;
    const formattedDate = `${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()}`;
    return `${formattedTime}\n${formattedDate}`;
  }
}
