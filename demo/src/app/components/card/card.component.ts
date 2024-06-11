import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  cards:any = [
  {
    id: 1,
    img: 'assets/images/LEO UP.jpg',
    name: 'Leo',
    detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, eos.',
  },
  {
    id: 2,
    img: 'assets/images/Kushi.jpg',
    name: 'Kushi',
    detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, eos.',
  },
  {
    id: 3,
    img: 'assets/images/JAILER.jpg',
    name: 'Jailer',
    detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, eos.',
  },
  { id: 4, img: 'assets/images/KOK.jpg', name: 'KOK', detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, eos.' },
];
}


