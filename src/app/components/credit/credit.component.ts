import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  focus:boolean= false
  cardForm: FormGroup;
  number: Number
  type: string
  constructor() {
    this.cardForm = new FormGroup({
      number: new FormControl('', [ Validators.pattern('5[1-5][0-9]{14}$'), Validators.required, Validators.maxLength(16),]),
      name: new FormControl('', [ Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$'),Validators.required, ]),
      dni: new FormControl('', [  Validators.pattern('[0-9]{7,9}'), Validators.required,Validators.maxLength(8),Validators.minLength(8),]),
      cvc: new FormControl('', [ Validators.pattern('^[0-9]+$'),Validators.required,Validators.minLength(3),Validators.maxLength(4),]),
      date: new FormControl('', [Validators.pattern('([0-9]{2})/([0-9]{2})'),Validators.required,]),
    });
  }
  get cardHolder() {
    return this.cardForm.controls;
  }
  
  ngOnInit(): void {}
  focused() {  
    this.focus = true
  }
  submitRegistration() {}
  changeFocus() {
    this.focus = false
  }
  inputChange() {
    this.number = this.cardForm.get('number')?.value
    let type = this.GetCardType(this.number)
    this.type = type.toUpperCase()
  }
  GetCardType(number:any){
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";
    // Mastercard 
    // Updated for Mastercard 2017 BINs expansion
     if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number)) 
        return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "AMEX";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "Visa Electron";

    return "";
  }


  creditCardType(cc: any) {
    let amex = new RegExp('^3[47][0-9]{13}$');
    let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
    let cup1 = new RegExp('^62[0-9]{14}[0-9]*$');
    let cup2 = new RegExp('^81[0-9]{14}[0-9]*$');

    let mastercard = new RegExp('^5[1-5][0-9]{14}$');
    let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');

    let disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
    let disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
    let disco3 = new RegExp('^6[45][0-9]{14}[0-9]*$');
    
    let diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');
    let jcb =  new RegExp('^35[0-9]{14}[0-9]*$');


    if (visa.test(cc)) {
      return 'VISA';
    }
    if (amex.test(cc)) {
      return 'AMEX';
    }
    if (mastercard.test(cc) || mastercard2.test(cc)) {
      return 'MASTERCARD';
    }
    if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
      return 'DISCOVER';
    }
    if (diners.test(cc)) {
      return 'DINERS';
    }
    if (jcb.test(cc)) {
      return 'JCB';
    }
    if (cup1.test(cc) || cup2.test(cc)) {
      return 'CHINA_UNION_PAY';
    }
    return undefined;
  }
}