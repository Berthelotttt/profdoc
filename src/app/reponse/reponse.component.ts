import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
interface Message {
  nom: string;
  contenu: string;
  date: string;
}

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
})
export class ReponseComponent implements OnInit {
  id: number | undefined; // ID récupéré à partir des paramètres de route
  messages: Message[] = [
    { nom: 'boy blac', contenu: "Help,hofdgdfgdfgdfgdfgdfgdfgdsfgdsfgdsfgsdfgsdfgsdfgsdfgdsfgdfgdsfgdfgw's goingw's going?", date: '1:4 PM\n00/00/2000' },
    { nom: 'boy blac', contenu: "Help, how's going?", date: '1:4 PM\n00/00/2000' },
    { nom: 'boy blac', contenu: "Help, how's going?", date: '1:4 PM\n00/00/2000' },
    { nom: 'boy blac', contenu: "Help, how's going?", date: '1:4 PM\n00/00/2000' },
    {nom: 'boy blac',contenu:"Help, hofdgdfgdfgdfgdfgdfgdfgdsfgdsfgdsfgsdfgsdfgsdfgsdfgdsfgdfgdsfgdfgw's going?",
      date: '1:4 PM\n00/00/2000',
    },
    { nom: 'boy blac', contenu: "Help, how's going?", date: '1:4 PM\n00/00/2000' },
  ];
  newMessage: string = ''; // Variable pour stocker le nouveau message

  constructor(private route: ActivatedRoute) {} // Injectez ActivatedRoute

  ngOnInit(): void {
    // Méthode 1 : Utilisation de snapshot pour récupérer les queryParams
    this.id = +this.route.snapshot.queryParams['id']; // Utilisation du '+' pour convertir en nombre

    // Méthode 2 : Utilisation de l'abonnement pour récupérer les queryParams (recommandé si les paramètres peuvent changer sans rechargement de la page)
    this.route.queryParams.subscribe((params) => {
      this.id = +params['id']; // Utilisation du '+' pour convertir en nombre
      console.log('ID récupéré via queryParams :', this.id);
    });
  }

  // Méthode pour naviguer en arrière
  goBack() {
    console.log('Navigating back...'); // Logique de navigation
  }

  // Méthode pour envoyer un message
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // Ajouter un nouveau message à la liste des messages
      this.messages.push({
        nom: 'Votre nom', // Remplacez par le nom de l'utilisateur actuel
        contenu: this.newMessage,
        date: this.getCurrentTime(), // Méthode pour obtenir l'heure actuelle
      });

      // Réinitialiser le champ de saisie
      this.newMessage = '';
    }
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
