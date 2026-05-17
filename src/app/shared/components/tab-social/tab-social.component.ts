import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab-social',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './tab-social.component.html',
  styleUrls: ['./tab-social.component.scss'],
})
export class TabSocialComponent implements OnInit {
  @Input() segmentos: {
    icon: string;
    content: string;
  }[] = [];

  constructor() {}

  ngOnInit() {}
}
