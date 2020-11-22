import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() image;
  @Input() text;
  @Output() confirmationEvent = new EventEmitter();
  @Output() deniedEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
