import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {SpreadsheetService} from '../../service/spreadsheet.service';


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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  data: any = [{
    'accountID': "1234563",
    'transaction': "Transaction 1",
    'amount': 5000,
    'reason': "I have no reason"
    },{
      'accountID': "34342324",
      'transaction': "Transaction 2",
      'amount':  6000,
      'reason': "I have no reason 2"
    },{
      'accountID': "54654645",
      'transaction':  "Transaction 3",
      'amount': 7000,
      'reason': "I have no reason 3"
    },];
    



  constructor(private _formBuilder: FormBuilder,private excelService:SpreadsheetService) { 
    this.confirm = false;
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'sample');
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
    let reqBody;
    if (this.trasactionType == "Shuttle") {
       reqBody = {
        'accountID': "1234567",
        'transaction': this.transaction,
        'amount': this.amount,
        'startDate': this.startDate,
        'end': this.endDate
      }
    } else {
       reqBody = {
        'accountID': "1234567",
        'transaction': this.transaction,
        'amount': this.amount,
        'reason': this.reason
       }
     }
     this.summaryPayment = reqBody;
     reqBody = [];
   }
}


export interface Transactions {
  value: string;
  viewValue: string;
}

