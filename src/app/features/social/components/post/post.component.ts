import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  menuAberto: boolean = false
  evento: any

  constructor() {}

  ngOnInit() {}

  abrirMenu(ev: any) {
    this.menuAberto = true;
    this.evento = ev;
  }
}
