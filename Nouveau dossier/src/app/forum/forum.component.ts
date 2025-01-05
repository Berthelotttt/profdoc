import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [ ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})



export class  ForumComponent   implements OnInit {
  activeTab: string = 'chats';
  list_user :any =[];
  mddg: string = '';
  constructor() {}
  segmentChange(e: any) {
    this.activeTab = e.target.value;
  }
  ngOnInit() {
  this.list_user=[
      { id: 1, Prenom: "ela", dernier_message: "hhhhhhh", date: "10/08/2021",heure:"12:14"},
      { id: 2, Prenom: "ela", dernier_message: "hhhhhhh", date: "10/08/2021",heure:"12:14"},
      { id: 3, Prenom: "ela", dernier_message: "hhhhhhh", date: "10/08/2021",heure:"12:14"},
      { id: 4, Prenom: "ela", dernier_message: "hhhhhhh", date: "10/08/2021",heure:"12:14"},
      { id: 5, Prenom: "ela", dernier_message: "hhhhhhh", date: "10/08/2021",heure:"12:14"},
      { id: 6, Prenom: "ela", dernier_message: "hhhhhhh", date: "10/08/2021",heure:"12:14"},
      { id: 7, Prenom: "ela", dernier_message: "hhhhhhh", date: "10/08/2021",heure:"12:14"},

  ];

}
}
