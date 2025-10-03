import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';
import { SportsService } from 'src/app/services/sports.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-club',
  templateUrl: './register-club.component.html',
  styleUrls: ['./register-club.component.scss']
})
export class RegisterClubComponent {

  datos:FormGroup;
  dataSport:any;
  dataUser:any;
  keyword='name';
  item:any;
  private id_sport='id_sport';
  private idUser='idUser';
  id_module:number;
  length=1;

  constructor(
    private Httpclient:HttpClient,
    private loginService:LoginService,
    private _location:Location,
    private sportService:SportsService,
    private userServices:UsersService
    ) {

    let tok= this.loginService.getJwtToken();

    this.datos=new FormGroup({
      token:new FormControl(tok),
      name:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(40)]),
      address:new FormControl('',[Validators.required,Validators.minLength(5)]),
      phone:new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(10)]),
    });

    this.id_module = 2

  }

  goBack(){
    this._location.back();
  }


  registerClub(){

    let idS=localStorage.getItem(this.id_sport);
    let idU=localStorage.getItem(this.idUser);

    let params={
      token:this.datos.value.token,
      name:this.datos.value.name,
      address:this.datos.value.address,
      phone:this.datos.value.phone,
      id_user:idU,
      id_sport:idS
    }

    if(this.datos.valid){
      this.Httpclient.post('https://api.darmon.co/auth/register-club',params).subscribe(()=>{
        this._location.back();
        Notiflix.Notify.success('Club registrado');
        localStorage.removeItem(this.id_sport);
        localStorage.removeItem(this.idUser);
      })
    }else{
      alert('Error! campos obligatorios');
    }
  }

  ngOnInit(): void {

    this.getSports(this.length);

    this.getUsers(this.length);

  }

  getSports(length:number){
    this.sportService.getSportsArray(length)
    .subscribe(resp=>{
      this.dataSport=resp
    });
  }

  getUsers(length:number){
    this.userServices.getUsersClub(this.id_module,length)
    .subscribe(resp=>{
      this.dataUser=resp
    })
  }

  selectEventSport(item:any){
    localStorage.removeItem(this.id_sport);
    localStorage.setItem(this.id_sport, item.id_sport)
  }

  selectEventClient(item:any){
    localStorage.removeItem(this.idUser);
    localStorage.setItem(this.idUser, item.id_user)
  }
}
