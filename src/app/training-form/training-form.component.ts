import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent implements OnInit {

  counter = [1];
  exercises = [
    { name: 'Supino' },
    { name: 'Agachamento' },
    { name: 'Barra fixa' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

  addCounter(): void {
    this.counter.push(1);
  }

}
