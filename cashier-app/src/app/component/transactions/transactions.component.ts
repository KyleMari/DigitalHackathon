import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})


export class TransactionsComponent implements OnInit {

  transactions: Transactions[] = [
    {value: '150', viewValue: 'Shuttle'},
    {value: '300', viewValue: 'LostID'}
  ];

  paymentMethods: PaymentMethods[] = [
    {method: 'Credit', viewMethod:'Credit'},
    {method: 'Debit', viewMethod:'Debit'}
  ]

  amount: string;
  transaction: string;
  trasactionType: string;
  events: string[] = [];
  startDate: Date;
  endDate: Date;
  selectShuttle: boolean = true;
  reason: string;
  confirmPayment: boolean = false;
  summaryPayment: object;
  confirm: boolean = false;
  sysDate: string;

  paymentMethod:string;
  cardHolderName:string;
  cardNumber :string;
  expDate:string;
  cvv:string;
  isCredit:boolean;
  isDebit:boolean;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { 
    this.confirm = false;
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  transactionLevel(event) {
    this.amount = event.value.value;
    this.transaction = event.value.value;
    this.trasactionType = event.value.viewValue;
    if (this.trasactionType === "Shuttle") {
      this.selectShuttle = true;
    } else {
      this.selectShuttle = false
    }
  }

  paymentLevel(event){
    this.paymentMethod = event.value.viewMethod;

    if(this.paymentMethod === "Credit"){
      this.isCredit === true;
      this.isDebit === false;
    }else{
      this.isCredit === false;
      this.isDebit === false;
    }
  }

  addStartEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
    this.events.push(`${type}: ${event.value}`);
  }

  addEndEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
    this.events.push(`${type}: ${event.value}`);
  }

  confirmTransaction() {
    this.confirm = true;
    this.sysDate = new Date().toLocaleString();
    let reqBody;
    if (this.trasactionType == "Shuttle") {
       reqBody = {
        'accountID': "1234567",
        'transaction': this.transaction,
        'amount': this.amount,
        'startDate': this.startDate,
        'end': this.endDate,
        'dateOfTransaction': this.sysDate,
        'paymentMethod':this.paymentMethod,
        'cardNumber':this.cardNumber,
      }
    } else {
       reqBody = {
        'accountID': "1234567",
        'transaction': this.transaction,
        'amount': this.amount,
        'reason': this.reason,
        'dateOfTransaction': this.sysDate,
        'paymentMethod':this.paymentMethod,
        'cardNumber':this.cardNumber,
       }
     }
     this.summaryPayment = reqBody;
     reqBody = [];
   }

   previousPage() {
    console.log("pasok");
    this.confirm = false;
  }
}


export interface Transactions {
  value: string;
  viewValue: string;
}

export interface PaymentMethods{
  method: string;
  viewMethod: string;
}
