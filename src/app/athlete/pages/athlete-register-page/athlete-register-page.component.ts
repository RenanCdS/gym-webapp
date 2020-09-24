import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-athlete-register-page',
  templateUrl: './athlete-register-page.component.html',
  styleUrls: ['./athlete-register-page.component.scss']
})
export class AthleteRegisterPageComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      age: ['', [Validators.required]],
      email: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      weight: ['', [Validators.required]],
    });
  }

}
