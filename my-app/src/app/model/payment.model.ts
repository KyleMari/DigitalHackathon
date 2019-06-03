export class Payment {

//for user
public user_id:string;

// balance
public outstanding_balance:number ;
public paid: number;
public is_paid:boolean;

// payment info
public payment_type:string;
public account_number:string;
public service_type:string;

// due
public due_date:Date;
public is_due:boolean;

// others
public note: string;



}
