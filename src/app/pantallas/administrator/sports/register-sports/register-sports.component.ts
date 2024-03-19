import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register-sports',
  templateUrl: './register-sports.component.html',
  styleUrls: ['./register-sports.component.scss']
})
export class RegisterSportsComponent {

  datos:FormGroup;

  constructor(
    private Httpclient:HttpClient,
    private loginService:LoginService,
    private _location:Location
    ) {

    let tok= this.loginService.getJwtToken();

    this.datos=new FormGroup({
      token:new FormControl(tok),
      name:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(40)]),
    });


  }
  goBack(){
    this._location.back();
  }


  registerSport(){

    let params={
      token:this.datos.value.token,
      name:this.datos.value.name,
    }

    if(this.datos.valid){
      this.Httpclient.post('https://api.darmon.co/auth/register-sport',params).subscribe(()=>{
        this._location.back();
        Notiflix.Notify.success('Deporte registrado');
      })
    }else{
      alert('Error! campos obligatorios');
    }
  }

  ngOnInit(): void {

  }

}
