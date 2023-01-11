import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {

   //MASTERCARD 5258 
  // VISA 4901 4901 4901 4901
  cardForm: FormGroup;
  constructor() {
    this.cardForm = new FormGroup({
      number: new FormControl('52', [
        Validators.pattern('5[1-5][0-9]{14}$'),
        Validators.required,
        Validators.maxLength(16),
      ]),
      name: new FormControl('', [
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$'),
        Validators.required,
      ]),
      dni: new FormControl('', [
        Validators.pattern('[0-9]{7,9}'),
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(8),
      ]),
      cvc: new FormControl('', [
        Validators.pattern('^[0-9]+$'),
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
      ]),
      date: new FormControl('01/20', [
        Validators.pattern('([0-9]{2})/([0-9]{2})'),
        Validators.required,
      ]),
    });
  }
  get cardHolder() {
    return this.cardForm.controls;
  }
  ngOnInit(): void {}
  onChange(): void {}
  submitRegistration() {
    console.log(this.cardForm.controls['name'].value.length);
    if (this.cardForm.valid) {
      console.log('formulario enviado!');
    }
  }
  onChanges(values:any) :void {
    console.log('entrp')

    console.log(values)
  }
  inputChange() {}

}
