import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {SpreadsheetService} from '../../service/spreadsheet.service';
import { AngularFireFunctions } from '@angular/fire/functions';


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
  cardclick: boolean = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  data: any = [{
    'accountID': "1234566",
    'transaction': "shuttle",
    'amount': 150,
    'startDate': "July 3, 2019",
    'end': "Jule 4, 2019"
    },{
      'accountID': "1234567",
      'transaction': "lostID",
      'amount': 300,
      'reason': "lost at the bus"
    },{
      'accountID': "1234568",
      'transaction': "lostID",
      'amount': 300,
      'reason': "Stolen"
    },];
    



  constructor(private _formBuilder: FormBuilder,private excelService:SpreadsheetService,
              private functions: AngularFireFunctions) { 
    this.confirm = false;
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.data, 'Transaction');
 }

  ngOnInit() {
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
        'transaction': "shuttle",
        'amount': 150,
        'startDate': "July 3, 2019",
        'end': "Jule 4, 2019"
      }
    } else {
       reqBody = {
        'accountID': "1234567",
        'transaction': "lostID",
        'amount': 300,
        'reason': "lost at the bus"
       }
     }
     this.summaryPayment = reqBody;
     reqBody = [];
   }

   reviewRequest() {    
    let reqBody;
    this.trasactionType = "Shuttle";
    if (this.trasactionType == "Shuttle") {
       reqBody = {
        'accountID': "1234567",
        'transaction': "shuttle",
        'amount': 150,
        'startDate': "July 3, 2019",
        'end': "Jule 4, 2019"
      }
    } else {
       reqBody = {
        'accountID': "1234567",
        'transaction': "lostID",
        'amount': 300,
        'reason': "lost at the bus"
       }
     }
     this.summaryPayment = reqBody;
     console.log("details: ", this.summaryPayment);
     this.cardclick = true;
   }

   sendConfirmationEmail(){
      this.functions
        .httpsCallable('sendConfirmationEmail')({
            employeeName: "Jessica Carolina M. Rodriguez",
            employeeEmail: "jessica.c.rodriguez@accenture.com",
            careerLevel: "11",
            accountID: "1234567",
            transactionType: "Lost ID",
            amount: "300"
        });
      console.log('email sent');
   }

}


export interface Transactions {
  value: string;
  viewValue: string;
}

