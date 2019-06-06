import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Payment } from '../model/payment.model';
import { User } from '../model/user.model';




@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

   private projectID:String = "hackathon-72437";
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
      let service_types: Array<string> = ['GSIS', 'SSS', 'Meralco'];
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
      service_type:  { stringValue: payment.service_type },
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
    * retrieves a list Promise of unpaid payments
    * 
    * 
    * for initial run requires index. See error msg
   */
   retrieveUnpaid(userID:string){
   /** */
    return this.http.post('https://firestore.googleapis.com/v1/projects/'+this.projectID +'/databases/(default)/documents:runQuery', 
    { structuredQuery: 
        { from: [
            { collectionId: 'payment' 
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
                        fieldPath: 'is_paid' 
                    }, 
                        op: 'EQUAL', 
                        value: { 
                            booleanValue: true 
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
    }, 
        limit: 4 
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
        { collectionId: 'payment' }],
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



   updatePayment(userId:string,service_type:string, paidAmount: number ){


   }


   addUser(user:User){ 
    
    var userUrl:string = this.url + "/users";

    var document = {fields: { 
          user_id: { stringValue: user.user_id },
          first_name: { stringValue: user.first_name },
           middle_name: { stringValue: user.middle_name },
          last_name: { stringValue: user.last_name }
    } }

    console.log('userUrl: ' + this.url);
    this.http.post(userUrl,document).toPromise().then(log=>{
       }).catch(err=>{
     console.log('Error: ' + JSON.stringify(err));

    });
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

payment.service_type = this.getServiceTypes()[0];

payment.is_due = false;

payment.due_date = new Date() ;

payment.note = "A test Payment 2";
this.addPaymentDetails(payment);

}

testRetrievePayment(){
  this.retrieveUnpaid("jmhinolan").then(res => { 
    //  console.log('val: ' + res)

      var  resultArray:Array<Payment> = Object.keys(res).map(function(personNamedIndex){
        let payment:Payment = res[personNamedIndex];
        console.log("payment:" + JSON.stringify(payment));
        return payment;
       });
       resultArray.forEach(result=>{
        console.log(JSON.stringify(result));
       });

       return resultArray;
  })
  .catch(error => { 
      console.log(error) 
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
