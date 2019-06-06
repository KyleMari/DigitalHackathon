import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Payment } from '../model/payment.model';
import { User } from '../model/user.model';
import { getDefaultService } from 'selenium-webdriver/chrome';




@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

   private projectID:String = "angular-cashier-app";
   private url:string = 
   "https://firestore.googleapis.com/v1/projects/"+this.projectID +"/databases/(default)/documents";
  // private key:String = "AIzaSyC3j6y9KYrQ9wOUUdt9bf8PMz5hlP9TrAk";
 
   private paymentCollection = "/payment";

   constructor(private http: HttpClient) { }


    getPaymentTypes(): Array<string>{
      let payment_types: Array<string> = ['Debit', 'Credit Card', 'Cash'];
      return payment_types;
    }

    getServiceTypes(): Array<string>{
      let service_types: Array<string> = ['Loans', 'Cash Advance Payment', 'Transportaion'];
      return service_types;
    }
/***
 * Adds a payment detail
 **/
   addPaymentDetails(payment: Payment){

    var userUrl:string = this.url + this.paymentCollection;
    var document = {fields: { 
      account_number: { stringValue: payment.account_number },
      user_id:  { stringValue: payment.user_id },
      payment_type:  { stringValue: payment.payment_type },
      outstanding_balance:  {doubleValue: payment.outstanding_balance },
      paid:  { doubleValue: payment.paid },
      transaction_type:  { stringValue: payment.transaction_type },
      due_date:  { timestampValue: payment.due_date },
      is_due:  { booleanValue: payment.is_due },
      is_paid:  { booleanValue: payment.is_paid },
      note:  { stringValue: payment.note },
    } }
    this.http.post(userUrl,document).toPromise().then(log=>{
      console.log('Success');
     }).catch(err=>{
      console.log('Error: ' + JSON.stringify(err));
     });
   }

/***
 * For Admin
 * ** */
   retrieveAllTransaction(){

    return this.http.post('https://firestore.googleapis.com/v1/projects/'+this.projectID +'/databases/(default)/documents:runQuery', 
    {
      structuredQuery:{
  
        from: [
          { collectionId: 'transaction' }],
      }
    }).toPromise();

   }

   retrieveAllUnpaidTransaction(){

    return this.http.post('https://firestore.googleapis.com/v1/projects/'+this.projectID +'/databases/(default)/documents:runQuery', 
    {
      structuredQuery:{
  
        from: [
          { collectionId: 'transaction' }],
        where:{
        fieldFilter: 
          {
            field: {
              fieldPath: 'is_paid' 
            },
            op: 'EQUAL',
            value: {
              booleanValue : false
            }
          }
        }
      }
    }).toPromise();

   }
   

   /***
    * retrieves a list Promise of unpaid payments
    * 
    * for initial run requires index. See error msg
   */
   retrieveUnpaid(userID:string){
   /** */
    return this.http.post('https://firestore.googleapis.com/v1/projects/'+this.projectID +'/databases/(default)/documents:runQuery', 
    { structuredQuery:  { 
       from: [
            { collectionId: 'transaction' }
             ], 
    orderBy: [
        { field: 
            { fieldPath: 'due_date' 
        }, direction: 'DESCENDING' }
    ], 
    where: { 
        compositeFilter: { 
            filters: [
                { fieldFilter: { 
                    field: { 
                        fieldPath: 'is_paid' 
                    }, 
                        op: 'EQUAL', 
                        value: { 
                            booleanValue: false 
                        } 
                    } 
                },{ fieldFilter: { 
                  field: { 
                      fieldPath: 'user_id' 
                  }, 
                      op: 'EQUAL', 
                      value: { 
                          stringValue: userID 
                      } 
                  } 
              }
            ], op: 'AND' 
        } 
    } 
        } 
    }
    ).toPromise()
   }

   /***
    * retrieves balance for using account number
   */
   retrieveOutstandingBal(account_number:string){
    return this.http.post('https://firestore.googleapis.com/v1/projects/'+this.projectID +'/databases/(default)/documents:runQuery', 
  {
    structuredQuery:{

      from: [
        { collectionId: 'transaction' }],
      select: { fields: 
        [
            { fieldPath: 'outstanding_balance' }, 
        ] 
      }, 
      where:{
      fieldFilter: 
        {
          field: {
            fieldPath: 'account_number' 
          },
          op: 'EQUAL',
          value: {
            stringValue : account_number
          }
        }
      }
    }
  }).toPromise();

   }

   retrieveDuePayments(){

   }


/********
 * 
 * 
 * 
 * **/
   updatePayment(user_id:string,service_type:string, paidAmount: number , account_number: string){

   var retrieveBal = this.http.post('https://firestore.googleapis.com/v1/projects/'+this.projectID +'/databases/(default)/documents:runQuery', 
    { structuredQuery: 
        { from: [
            { collectionId: 'transaction' 
        }
    ], 
    orderBy: [
        { field: 
            { fieldPath: 'due_date' 
        }, direction: 'DESCENDING' }
    ], 
    where: { 
        compositeFilter: { 
            filters: [
                { fieldFilter: { 
                    field: { 
                        fieldPath: 'service_type' 
                    }, 
                        op: 'EQUAL', 
                        value: { 
                          stringValue: service_type 
                        } 
                    } 
                },{ fieldFilter: { 
                  field: { 
                      fieldPath: 'user_id' 
                  }, 
                      op: 'EQUAL', 
                      value: { 
                          stringValue: user_id 
                      } 
                  } 
                },{ fieldFilter: { 
                  field: { 
                      fieldPath: 'account_number' 
                  }, 
                      op: 'EQUAL', 
                      value: { 
                          stringValue: account_number 
                      } 
                  } 
                }
            ], op: 'AND' 
        } 
    }, 
        } 
    }
    ).toPromise()

    retrieveBal.then(suc=>{


       console.log('retrieveBal : ' + JSON.stringify(suc));

      

    })



   }


   addUser(user:User){ 
    
    var userUrl:string = this.url + "/users";

    var document = {fields: { 
          user_id: { stringValue: user.user_id },
          first_name: { stringValue: user.first_name },
           middle_name: { stringValue: user.middle_name },
          last_name: { stringValue: user.last_name },
          career_lvl: { stringValue: user.career_lvl },
          email: { stringValue: user.email },
    } }

    console.log('userUrl: ' + this.url);
    this.http.post(userUrl,document).toPromise().then(log=>{
       }).catch(err=>{
     console.log('Error: ' + JSON.stringify(err));

    });
}


getUserDetails(email:string){
  return this.http.post('https://firestore.googleapis.com/v1/projects/'+this.projectID +'/databases/(default)/documents:runQuery', 
  {
    structuredQuery:{

      from: [
        { collectionId: 'users' }],
      where:{
      fieldFilter: 
        {
          field: {
            fieldPath: 'email' 
          },
          op: 'EQUAL',
          value: {
            stringValue : email
          }
        }
      }
    }
  }).toPromise();
      
}




  /***
   * For test only
   * * */
  
testUserAdd(){

  var user:User = new User();

  user.first_name = "John Mari";
  user.last_name = "Hinolan";
  user.middle_name = "De Guzman";
  user.user_id = "hinjo";
  user.email = "hinolanjohn@gmail.com";
  user.career_lvl = "13";

  this.addUser(user);

}
testPayment(){
var payment:Payment = new Payment();

payment.account_number = "25345346546456";
payment.user_id = "jmhinolan";

payment.is_paid= false;

payment.outstanding_balance = 10000.00;
payment.paid = 0.00;

payment.payment_type = this.getPaymentTypes()[1];

payment.transaction_type = this.getServiceTypes()[0];

payment.is_due = false;

payment.due_date = new Date() ;

payment.note = "A test Payment 2";
this.addPaymentDetails(payment);

}


convertResToPayment(obj){
//fields":{"payment_type":{"stringValue":"Debit"},"service_type":{"stringValue":"Food"}
//,"outstanding_balance":{"doubleValue":12000}
//,"is_paid":{"booleanValue":false},"is_due":{"booleanValue":false},
//"user_id":{"stringValue":"hinjo"},"note":{"stringValue":"A test Payment 2"},"paid":{"doubleValue":0},
//"account_number":{"stringValue":"25345346546456"},"due_date":{"timestampValue":"2019-06-05T09:53:34.229Z"}}
let payment:Payment = new Payment;
var fields = obj.document.fields;
payment.payment_type =  fields.payment_type.stringValue;
payment.transaction_type =  fields.transaction_type.stringValue;
payment.outstanding_balance =  fields.outstanding_balance.doubleValue;
payment.is_paid =  fields.is_paid.booleanValue;
payment.is_due =  fields.is_due.booleanValue;
payment.user_id =  fields.user_id.stringValue;
payment.note =  fields.note.stringValue;
payment.paid =  fields.paid.doubleValue;
payment.account_number =  fields.account_number.stringValue;
payment.due_date =  fields.due_date.timestampValue;

return payment;
}



processTransactionResult(res){

  var  resultArray:Array<Payment> = Object.keys(res).map(personNamedIndex=>{
    var obj = res[personNamedIndex];
   
   var pay = this.convertResToPayment(obj);
    return pay;
   });

   console.log(JSON.stringify(resultArray));

   return resultArray;

}

convertResToUser(obj){

  let user:User = new User;
var fields = obj.document.fields;

user.first_name =  fields.first_name.stringValue;
user.last_name =  fields.last_name.stringValue;
user.middle_name =  fields.middle_name.stringValue;
user.email =  fields.email.stringValue;
user.career_lvl =  fields.career_lvl.stringValue;

return user;
}
processuserResult(res){

  var  resultArray:Array<User> = Object.keys(res).map(personNamedIndex=>{
    var obj = res[personNamedIndex];
   
   var pay = this.convertResToUser(obj);
    return pay;
   });

   

   return resultArray;

}

testRetrievePayment(){
  // this.retrieveUnpaid("hinjo").then(res => { 
  //      return this.processTransactionResult(res);
  // })
  // .catch(error => { 
  //     console.log(error) 
  // });

  // this.retrieveAllTransaction().then(res => { 
  //   return this.processTransactionResult(res);
  //  })
  //   .catch(error => { 
  //     console.log(error) 
  //  });

  // this.retrieveOutstandingBal('hrlouyijhgh').then(res => { 
  //   var value = res[0]; // gets the firest
     
  //    var doubleval =  value.document.fields.outstanding_balance.doubleValue;

  //     console.log('doubleval' + doubleval)
  //   return  doubleval;
  //  })
  //   .catch(error => { 
  //     console.log(error) 
  //  });

 // this.testUserAdd();

  this.getUserDetails("hinolanjohn@gmail.com").then(res=>{
    console.log(JSON.stringify(this.processuserResult(res)));
  });

  
}

testOutstandingBalance(){
  this.retrieveOutstandingBal("2535346546456").then(usr=>{
    console.log(JSON.stringify(usr));
  }).catch(err=>{
    console.log(JSON.stringify(err));
  })
  

}


}
