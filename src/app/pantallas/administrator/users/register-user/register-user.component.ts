import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit{

  datos:FormGroup;
  private emailPattern:any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private Httpclient:HttpClient,
    private loginService:LoginService,
    private _location:Location
    ) {

    let tok= this.loginService.getJwtToken();

    this.datos=new FormGroup({
      token:new FormControl(tok),
      name:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(40)]),
      username:new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
      password:new FormControl('',Validators.required),
      phone:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(10)]),
      id_module:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(1)]),
    });


  }
  goBack(){
    this._location.back();
  }


  registerUser(){

    let params={
      token:this.datos.value.token,
      name:this.datos.value.name,
      username:this.datos.value.username,
      password:this.datos.value.password,
      phone:this.datos.value.phone,
      id_module:this.datos.value.id_module,
    }

    if(this.datos.valid){
      this.Httpclient.post('https://api.darmon.co/auth/register-admin',params).subscribe(()=>{
        this._location.back();
        Notiflix.Notify.success('Usuario registrado');
      })
    }else{
      alert('Error! campos obligatorios');
    }
  }

  ngOnInit(): void {

  }

}
