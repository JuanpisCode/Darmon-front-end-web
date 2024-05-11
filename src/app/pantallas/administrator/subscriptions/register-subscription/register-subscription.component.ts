import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';
import { PlansService } from 'src/app/services/plans.service';

@Component({
  selector: 'app-register-subscription',
  templateUrl: './register-subscription.component.html',
  styleUrls: ['./register-subscription.component.scss']
})
export class RegisterSubscriptionComponent {

  datos:FormGroup;
  dataPlan:any;
  dataUser:any;
  keyword='name';
  item:any;
  private idUser='idUser';
  private idPlan='idPlan';
  length=1;

constructor(
  private _location:Location,
  private Httpclient:HttpClient,
  private loginService:LoginService,
  private userServices:UsersService,
  private planServices:PlansService,
){
  let tok= this.loginService.getJwtToken();

  this.datos=new FormGroup({
    token:new FormControl(tok),
    id_module:new FormControl('', Validators.required),
  });


}


  goBack(){
    this._location.back();
  }

  registerSubscription(){

    let idU=localStorage.getItem(this.idUser);
    let idP=localStorage.getItem(this.idPlan);

    let params={
      token:this.datos.value.token,
      id_payment_plan:idP,
      id_user:idU,
      state:'true'
    }

    if(this.datos.valid){
      this.Httpclient.post('https://api.darmon.co/auth/register-subscription',params).subscribe(()=>{
        this._location.back();
        Notiflix.Notify.success('Subscripción registrado');
        localStorage.removeItem(this.idUser);
      })
    }else{
      alert('Error! campos obligatorios');
    }

  }

  ngOnInit(): void {

    this.getPlans(this.length)
  }


  getUsers(length:number){
    if(this.datos.valid){
      this.userServices.getUsersClub(this.datos.value.id_module,length)
      .subscribe(resp=>{
        this.dataUser=resp
      })
    }else{
      alert('Error! campos obligatorios');
    }

  }

  getPlans(length:number){
    this.planServices.getPlans(length)
    .subscribe(resp=>{
      this.dataPlan=resp
    })
  }

  selectSubscriptionClient(item:any){
    localStorage.removeItem(this.idUser);
    localStorage.setItem(this.idUser, item.id_user)
  }

  selectSubscriptionPlan(item:any){
    localStorage.removeItem(this.idPlan);
    localStorage.setItem(this.idPlan, item.id_payment_plan)
  }
}
