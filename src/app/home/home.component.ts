import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { BackendserviceService, Cour, LoadingService } from '../backendservice.service';
import { CleComponent } from '../cle/cle.component';
import { CourComponent } from '../cour/cour.component';
import { NouveauMessageComponent } from '../nouveau-message/nouveau-message.component';
import { ReponseComponent } from '../reponse/reponse.component';
@Component({
  standalone: true,
  imports:  [FormsModule,CommonModule, MatButtonModule, MatInputModule, MatCardModule, MatIconModule, MatButtonToggleModule, CourComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public loading: boolean = false;

  constructor(public loadingService: LoadingService,private router: Router, public dialog: MatDialog,private  Backend:  BackendserviceService ) {}
    // Méthode appelée lors de la sélection d'un fichier
  onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }
   //--------------------------Envoyer le formulaire cour-------------------------------------------
   async onSubmit(): Promise<void> {
    if (this.selectedFile && this.titre) {
      this.loadingService.show();
      this.loading = true;
      const formData = new FormData();
      const date = new Date().toISOString().split('T')[0]; // Format de date YYYY-MM-DD

      formData.append('titre', this.titre);
      formData.append('date', date);
      formData.append('fichier', this.selectedFile);

      this.Backend.uploadCour(formData).subscribe(
        (response) => {
          alert(response.message);
          this.getCours();
          console.log(response);
          this.loadingService.hide(); // Cacher le chargement
          this.loading = false;
        },
        (error) => {
          console.error('Erreur lors du téléchargement', error);
          alert('Erreur lors du téléchargement : ' + error.message);
          this.loadingService.hide(); // Cacher le chargement
        }
      );

    } else {
      alert('Veuillez remplir tous les champs');
    }
  }
//---------------------------------recupere---------------------------------------
courss: Cour[] = [];
getCours(): void {
  this.Backend.getMessages().subscribe(
    (data: Cour[]) => {
      this.courss = data;
    },
    (error) => {
      console.error('Erreur lors de la récupération des cours', error);
    }
  );
}
voir_file(file: Blob | Uint8Array | string): void {
  let blob: Blob;
  // Vérifiez si file est de type Uint8Array
  if (file instanceof Uint8Array) {
    blob = new Blob([file], { type: 'application/pdf' });
  } else if (file instanceof Blob) {
    blob = file; // Si c'est déjà un Blob
  } else if (typeof file === 'string') {
    // Si le fichier est une chaîne Base64
    const byteCharacters = atob(file);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    blob = new Blob([byteArray], { type: 'application/pdf' });
  } else {
    console.error('Type de fichier non supporté', file);
    return;
  }
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
}
delete_file(index: number): void {
  console.log(index)
  this.Backend.deleteCour(index).subscribe(
    () => {
      alert('Cours supprimé avec succès');
      this.getCours();
      this.courss.splice(index, 1); // Supprimer le cours de la liste
    },
    (error) => {
      console.error('Erreur lors de la suppression du cours', error);
    }
  );
}



//---------------------------------------------------------------------------------
  ngOnInit() {
    this.getCours();
  }
  selectedFile: File | null = null;
  titre: string = '';
  date: string = '';
  //-----------------
  selectedSegment = 'cours';
  lastselect = '';
  list_user = [
    { id: 1, Prenom: 'ela', dernier_message: 'Ceci est un message très long qui doit être tronqué pour ne pas prendre trop de place', date: '10/08/2021', heure: '12:14', showFullMessage: false },
    { id: 2, Prenom: 'ela', dernier_message: 'Un autre message plus court', date: '10/08/2021', heure: '12:14', showFullMessage: false },
    // Autres utilisateurs
  ];

  cours = [
    { nom: 'Nom cours', date: '10/10/2021' },
    { nom: 'Nom cours', date: '10/10/2021' },
  ];

  deleteClient(index: number): void {
    this.cours.splice(index, 1);
  }

  reponse(id: number): void {
    this.dialog.open(ReponseComponent, {
      width: '500px',
    });
  }

  nouveau_message(): void {
    this.dialog.open(NouveauMessageComponent, {
      width: '400px',
    });
  }

  addClient(nom: string, date: string): void {
   /* if (nom && date) {
      this.cours.push({ nom, date });
    }*/
  }

  LASTselect(): void {
    this.lastselect = this.selectedSegment;
  }

  cle(): void {
    this.selectedSegment = this.lastselect;
    this.dialog.open(CleComponent, {
    });
  }

  toggleFullMessage(user: any): void {
    user.showFullMessage = !user.showFullMessage;
  }

  truncateMessage(message: string, limit: number): string {
    if (message.length > limit) {
      return message.substring(0, limit) + '...';
    }
    return message;
  }
}
