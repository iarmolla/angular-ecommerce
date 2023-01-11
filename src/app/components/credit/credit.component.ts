import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {

  //MASTERCARD 5258 
  // VISA 4901 
  focus:boolean= false
  cardForm: FormGroup;
  number: Number = 0
  constructor() {
    this.cardForm = new FormGroup({
      number: new FormControl('', [ Validators.pattern('5[1-5][0-9]{14}$'), Validators.required, Validators.maxLength(16), ]),
      name: new FormControl('', [ Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$'),Validators.required, ]),
      dni: new FormControl('', [  Validators.pattern('[0-9]{7,9}'), Validators.required,Validators.maxLength(8),Validators.minLength(8),]),
      cvc: new FormControl('', [ Validators.pattern('^[0-9]+$'),Validators.required,Validators.minLength(3),Validators.maxLength(4),]),
      date: new FormControl('01/20', [Validators.pattern('([0-9]{2})/([0-9]{2})'),Validators.required,]),
    });
  }
  get cardHolder() {
    return this.cardForm.controls;
  }
  ngOnInit(): void {}
  focused() {  
    
    this.focus = !this.focus
  }
  submitRegistration() {
   
  }
  
  inputChange() {
    if(this.number >=3 && this.number<=4) {
      console.log('si')
    }
    this.number = this.cardForm.get('number')?.value
    console.log(this.number)
  }

}
