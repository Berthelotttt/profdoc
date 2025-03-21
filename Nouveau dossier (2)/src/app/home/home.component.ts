import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { BackendserviceService, Cour, LoadingService, Message, Td } from '../backendservice.service';
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
 titre_td:string='';
 selectedFile_td: Blob | null = null; // Modifiez le type pour accepter un Blob
 //------------td----------
 selectedFile: File | null = null;
 titre: string = '';
 date: string = '';
 Tds: Td[]=[]
 //--------cour---------
 selectedSegment = 'cours';
 lastselect = '';
 courss: Cour[] = [];

 //-----------forum-------
 activeTab: string = 'chats';
 list_user :any =[];
 messages: Message[] = [];
 newMessage: string = '';
 nom: string = '';  // Variables pour stocker le nom et prénom
 prenom: string = '';
 tf : string='';
 //-----------------------
  constructor(private cdr: ChangeDetectorRef,public loadingService: LoadingService,private router: Router, public dialog: MatDialog,private  Backend:  BackendserviceService ) {}
  ngOnInit() {
    this.getCours();
    this.getTds();
    this.getMessages();
  }


  // Méthode appelée lors de la sélection d'un fichier
  onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
      this.selectedFile_td = event.target.files[0];
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

  async onSubmit_td(): Promise<void> {
    if (this.selectedFile_td && this.titre_td) {
      this.loadingService.show();
      this.loading = true;
      const formData = new FormData();
      const date = new Date().toISOString().split('T')[0];

      formData.append('titre', this.titre_td);
      formData.append('date', date);
      formData.append('fichier', this.selectedFile_td);

      this.Backend.uploadTd(formData).subscribe(

        (response) => {
          this.getTds();
          console.log(response);
          this.loadingService.hide(); // Cacher le chargement
          this.loading = false;
        },
        (error) => {
          this.loadingService.hide(); // Cacher le chargement
          this.loading = false;
        }
      );
    } else {
      this.loadingService.hide();
    }
  }
//---------------------------------recupere-cour td--------------------------------------

getCours(): void {
  this.Backend.getCours().subscribe(
    (data: Cour[]) => {
      this.courss = data;
    },
    (error) => {
      console.error('Erreur lors de la récupération des cours', error);
    }
  );
}
getTds(): void {
  this.Backend.getTds().subscribe(
    (data: Td[]) => {
      this.Tds = data;
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
      this.getTds();
      this.courss.splice(index, 1); // Supprimer le cours de la liste
    },
    (error) => {
      console.error('Erreur lors de la suppression du cours', error);
    }
  );
}
delete_file_td(index: number): void {
  this.Backend.deleteTd(index).subscribe(
    () => {
      this.getTds();
      this.courss.splice(index, 1); // Supprimer le cours de la liste
    },
    (error) => {
      console.error('Erreur lors de la suppression du cours', error);
    }
  );
}
//------------------------------------forum---------------------------------------------
async getMessages(){
  this.Backend.getMessages().subscribe(
    (data: Message[]) => {
      this.messages = data;
    },
    (error) => {
      alert('Erreur lors de la récupération des messages');
    }
  );
}
async sendMessage()  {
this.getMessages();
  if (this.newMessage.trim()) {
    const message: Message = {
      id: 0, // Laissez le champ id vide ou laissez le backend le générer
      nom: 'Proffesseur', // Remplacez par le nom de l'utilisateur actuel
      prenom:  this.prenom, // Remplacez par le prénom de l'utilisateur actuel
      date: new Date().toISOString(), // Date actuelle
      time:  new Date().toTimeString().slice(0, 5).toString(),
      message: this.newMessage,
      id_reponse: 0 // Remplacez par un ID de réponse si nécessaire
    };
    this.loadingService.show();
    this.loading = true;
    this.Backend.addMessage(message).subscribe(
      () => {
        this.newMessage = ''; // Réinitialisez le champ de saisie
        this.getMessages(); // Rechargez les messages
        this.loadingService.hide();
      this.loading = false;
      },
      (error) => {
        this.loadingService.hide();
        this.loading = false;
        alert('Erreur lors de l\'envoi du message' );

      }
    );}
}

reponse(id: number): void {
  this.dialog.open(ReponseComponent, {
    width: '500px',
    data: { id: id } // Passer l'ID à ReponseComponent
  });
}
nouveau_message(): void {
  this.dialog.open(NouveauMessageComponent, {
    width: '400px',
  });
}
//-------------------------------------cle--------------------------------------------
cle(): void {
  this.cdr.detectChanges();
    this.selectedSegment = this.lastselect;
    this.dialog.open(CleComponent, {
    });
  }
//--------------------------------------------------------------------------------------
  toggleFullMessage(user: any): void {
    user.showFullMessage = !user.showFullMessage;
  }

  truncateMessage(message: string, limit: number): string {
    if (message.length > limit) {
      return message.substring(0, limit) + '...';
    }
    return message;
  }
  LASTselect(): void {
    this.lastselect = this.selectedSegment;
  }

  //--------------------------------------------------------------------------------------------
}
