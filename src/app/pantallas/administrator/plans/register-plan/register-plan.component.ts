import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-register-plan',
  templateUrl: './register-plan.component.html',
  styleUrls: ['./register-plan.component.scss']
})
export class RegisterPlanComponent {

  datos:FormGroup;
  private id_user='id_user';

  constructor(
    private _location:Location,
    private loginService:LoginService,
    private Httpclient:HttpClient,

  ) {

    let tok= this.loginService.getJwtToken();

    this.datos=new FormGroup({
      token:new FormControl(tok),
      name:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(40)]),
      price:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(20)]),
      content:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(10000)]),
    });
  }

  goBack(){
    this._location.back();
  }

  registerPlan(){

    let idU=localStorage.getItem(this.id_user);

    let params={
      token:this.datos.value.token,
      name:this.datos.value.name,
      price:this.datos.value.price,
      content:this.datos.value.content,
      id_user:idU,
    }

    if(this.datos.valid){
      this.Httpclient.post('https://api.darmon.co/auth/register-plan',params).subscribe(()=>{
        this._location.back();
        Notiflix.Notify.success('Plan registrado');
      })
    }else{
      alert('Error! campos obligatorios');
    }
  }
}
