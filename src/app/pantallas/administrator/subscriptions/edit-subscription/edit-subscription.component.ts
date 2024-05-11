import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Location } from '@angular/common';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.scss']
})
export class EditSubscriptionComponent {

  loading: boolean = false;
  datos:FormGroup;
  public plans:any=[];
  id_user: number;
  id_payment_plan: number;
  error=false;

  constructor(
    private loginService:LoginService,
    private subscriptionService:SubscriptionService,
    private _location:Location,
    private fb:FormBuilder,
    private activateRoute:ActivatedRoute,
    private httpclient:HttpClient,
  ){

    let tok= this.loginService.getJwtToken();

    this.datos=this.fb.group({
      token:new FormControl(tok),
      state:new FormControl(Validators.required),
    });

    this.id_user= Number(this.activateRoute.snapshot.paramMap.get('id_user'))
    this.id_payment_plan= Number(this.activateRoute.snapshot.paramMap.get('id_payment_plan'))
  }

  goBack(){
    this._location.back();
  }

  ngOnInit(): void {

    if(this.id_payment_plan!=0){

      this.getSubscription()
      }
  }
  getSubscription():void{
    this.subscriptionService.getSingleSubscription(this.id_payment_plan,this.id_user)
    .subscribe(data=>{
      this.datos.patchValue({
        state: data.state,
      });

    })
  }

  editar():void{

    let params={
      token:this.datos.value.token,
      id_payment_plan:this.id_payment_plan,
      state:this.datos.value.state,
      id_user:this.id_user
    }

    if(this.datos.valid){
      this.httpclient.post('https://api.darmon.co/auth/edit-subscription',params).subscribe(resp=>{
        ErrorInterceptor
        Notiflix.Notify.success('Subscripción editado correctamente');
        this._location.back();
      })
    }else{
      alert('Error! campos obligatorios');
    }
   }

displayStyle= "none";

openPopup(){
  this.displayStyle= "block";
}
closePopup(){
  this.displayStyle= "none";
}

delete():void{
  this.subscriptionService.deleteSubscription(this.id_payment_plan,this.id_user)
  .subscribe(()=>{
    Notiflix.Notify.success('Subscripción eliminado');
    this._location.back();
  });
}
}
