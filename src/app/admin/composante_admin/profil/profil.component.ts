
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackendserviceService } from '../../../backendservice.service';
export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  nMatricule: string;
  email: string;
  motPasse: string;
  dateNaissance: string;
  telephone: string;
  profession: string;
  idPc: string;
  idBureau: string;
  valide: string;
}


@Component({
  imports: [
    FormsModule,
  ],
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent   implements OnInit{

  constructor(private route: ActivatedRoute, private backend: BackendserviceService) {}

  user_id: Utilisateur = {
    nom: "",
    prenom: "",
    nMatricule: "",
    email: "",
    motPasse: "",
    dateNaissance: "",
    telephone: "",
    profession: "",
    idPc: "",
    idBureau: "",
    valide: ""
  };

  id_utilisateur: string = "";
  nom_user: string = "";
  prenom_user: string = "";
  nMatricule_user: string = "";
  email_user: string = "";
  motPasse_user: string = "";
  dateNaissance_user: string = "";
  telephone_user: string = "";
  profession_user: string = "";
  idPc_user: string = "";
  idBureau_user: string = "";
  valide_user: string = "";

  ngOnInit(): void {
    this.id_utilisateur = this.route.snapshot.paramMap.get('id') || '-1';
    this.id_user= Number( this.id_utilisateur)
    this.recupe_user()
  }

  nom: string = '';
  prenom: string = '';
  id_user: number = 0;
  user: Utilisateur[] = [];

  //------------------------------------------user--------------------------------
  async recupe_user() {
    try {
      await this.backend.getTousLesUtilisateurs().subscribe({
        next: (data) => {
          this.user = data;
          console.log(   this.user)
          this.user_id = this.user.find(u => u.id === this.id_user)||{
            nom: "",
            prenom: "",
            nMatricule: "",
            email: "",
            motPasse: "",
            dateNaissance: "",
            telephone: "",
            profession: "",
            idPc: "",
            idBureau: "",
            valide: ""
          }; ;
          const utilisateur = this.user.find(u => u.id === this.id_user);
          if (utilisateur) {
            this.nom = utilisateur.nom;
            this.prenom = utilisateur.prenom;
          }
        },
        error: (err) => {
          alert("Ce compte n'existe pas");
        }
      });
    } catch (err) {
      console.error("Erreur lors de la récupération des utilisateurs:", err);
      alert("Une erreur s'est produite lors de la récupération des utilisateurs.");
    }
  }
  async modification(){

     console.log(this.user_id)
     await this.backend.mettreAJourUtilisateur(  this.id_user,this.user_id).subscribe({
      next: (response) => {
        console.log("Ordinateur mis à jour dans le backend :", response );
        this.recupe_user()
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour de l'ordinateur :", err);
      }
    });
  }
}

