import { Platform } from '@angular/cdk/platform';
import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterOutlet } from '@angular/router';
import { BackendserviceService } from '../backendservice.service';
export interface Bureau {
  id: number;
  nom: string;
  etage: number;
}
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
export interface Ordinateur  {
  id?: number;  // Ajout d'un ID facultatif
  nom: string;
  prix: number;
  dateAcquisition: string;  // Utiliser string pour la date
  statut: string;
  idBureau: number;
  ordinateur: { [key: string]: any };  // Map en Java devient un objet en JS
  os: { [key: string]: any };
  cpu: { [key: string]: any };
  disks: { [key: string]: any }[];
  ram: { [key: string]: any }[];
  virus: { [key: string]: any }[];
  gpu: { [key: string]: any }[];
  moniteur: { [key: string]: any }[];
  peripheriques: { [key: string]: any }[];
  interfacereseau: { [key: string]: any }[];
  logiciel: { [key: string]: any }[];
}
@Component({
  selector: 'app-acceuille',

  templateUrl: './acceuille.component.html',
  styleUrl: './acceuille.component.scss',

  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],

})
export class AcceuilleComponent {

   plateformeDifferentDeNavigateur:boolean=false
 title = 'profdoc';
  isHomePage = false;
  valeur_inscription:boolean=false;
  valeur_scroll:boolean=false;
  roleSelectionne: string = 'admin'; // Valeur par défaut
  ordinateurs_id_bureau: Ordinateur[] = [];  // Liste d'ordinateurs

  bureaux: Bureau[] = [];
  //------------------utilisateur-----------------
  newutilisateur: Utilisateur = {
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
  recup_utilisateur:Bureau[] = []
  utilisateur: Utilisateur | null = null;
  //------------------connexion--------------------
  num_matricule_connx:string="";
  mot_pass_connx:string="";
  validation_connexion:boolean=false;
  constructor(private platform: Platform, private backend: BackendserviceService, public dialog: MatDialog, private router: Router, private location: Location) {}  // Injecter le Router

  async ngOnInit() {
     const userAgent = navigator.userAgent;
    this.plateformeDifferentDeNavigateur =  await this.backend. verifieelectron()
    console.log(  this.plateformeDifferentDeNavigateur )
    // Écouter les changements de l'historique
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/acceuille';
    });
    this.loadBureaux()

  }
  //------------------Affiche-------------------
  Affiche_inscription(){
    this.valeur_inscription=true;
    this.valeur_scroll=true;
  }
  connexio_ici(){
    this.valeur_inscription=false;
    this.valeur_scroll=false;
  }
  //-----------------------------------------------
  async connexion(){
    if(this.plateformeDifferentDeNavigateur==true){
      this. roleSelectionne='Autres professions'
    }
    console.log(this.num_matricule_connx );
    console.log( this.mot_pass_connx);
     await this.backend.getUtilisateurByMatricule(this.num_matricule_connx).subscribe({
      next: (data) => {
        this.utilisateur = data;
        if( this.utilisateur){
          if(this.utilisateur.valide =="true" ){
            if( this.utilisateur.motPasse==this.mot_pass_connx ){
              this.validation_connexion=true
             }
             else{
              this.validation_connexion=true
              alert("Mot de passe incorrecte")
              return
             }
             if (this.validation_connexion===true) {
              console.log( this.validation_connexion)
              if (this.roleSelectionne === 'Administrateur parc informatique' && this.roleSelectionne === this.utilisateur.profession) {
                this.router.navigate([`/admin/${this.utilisateur.id}`]);
              } else if (this.roleSelectionne === 'Administrateur réseau' && this.roleSelectionne === this.utilisateur.profession) {
                  this.router.navigate([`/admin_reseau/${this.utilisateur.id}`]);
              } else if (this.roleSelectionne === 'Technicien' && this.roleSelectionne === this.utilisateur.profession) {
                  this.router.navigate([`/technicien/${this.utilisateur.id}`]);
              } else if (this.roleSelectionne === 'Autres professions' && this.roleSelectionne === this.utilisateur.profession) {
                this.router.navigate([`/employe/${this.utilisateur.id}`]);
              }
              else{
                alert("Verifier votre Profession")
              }
             }
          }
          else{
            alert("Attendez la validation de votre compte")
          }
        }
        else{
          alert("Ce compte n'existe pas")
        }
      },
      error: (err) => {
        alert("Ce compte n'existe pas")
        this.utilisateur = null;
      }
    });


  }

  loadBureaux()  {
    this.backend.getAllBureaux().subscribe(
      (data) => {
        this.bureaux = data;
      },
      (error) => {
        console.error('Erreur lors du char ent des bureaux', error);
      }
    );
  }
  recup_ord_idburau(event: Event): void {
    const selectedBureauId = Number((event.target as HTMLSelectElement).value);
    console.log("Bureau sélectionné :", selectedBureauId);
    this.backend.getOrdinateurByIdBureau(selectedBureauId).subscribe(
      (data) => {
        //gere le retour objet ou tableau
        this.ordinateurs_id_bureau = Array.isArray(data) ? data : [data];
        console.log("rrrrrrrr", this.ordinateurs_id_bureau[0].id)

      },
      (error) => {
        console.error('Erreur lors recup ord', error);
      }
    );
  }
  //------------------recupere---------------------
  //--recupere ordin
  getOrdinateursParIdBureau(idBureau: number): void {
  }
  async inscription(){
      this.newutilisateur.valide="false";
      console.log("eee",this.newutilisateur)
    await this.rechercherUtilisateur(this.newutilisateur.nMatricule)
  }
  // Rechercher un utilisateur par matricule
  rechercherUtilisateur(matricule:string) {

    if ( matricule) {
      this.backend.getUtilisateurByMatricule(matricule).subscribe({
        next: (data) => {
          this.utilisateur = data;
          console.log("rrr",this.utilisateur);
          if( this.utilisateur){
            alert("Un(e) personne est déjà inscrite avec ce numéro de matricule !");
          }
          else{
            this.backend.ajouterUtilisateur(this.newutilisateur).subscribe(
              (response) => {
                alert("Attendez la validation de l'administrateur du parc informatique");
              },
              (error) => {
                console.error('Erreur lors de l\'ajout du bureau', error);
              }
            );
          }
        },
        error: (err) => {
          console.error('Utilisateur non trouvé', err);
          this.utilisateur = null;
        }
      });
    }
  }
}
