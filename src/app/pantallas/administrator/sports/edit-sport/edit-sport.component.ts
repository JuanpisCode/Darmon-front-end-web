import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';
import { SportsService } from 'src/app/services/sports.service';

@Component({
  selector: 'app-edit-sport',
  templateUrl: './edit-sport.component.html',
  styleUrls: ['./edit-sport.component.scss']
})
export class EditSportComponent {

  loading: boolean = false;
  datos:FormGroup;
  id_sport: number;
  error=false;

  constructor(private httpclient:HttpClient,
    private loginService:LoginService,
    private _location:Location,
    private fb:FormBuilder,
    private activateRoute:ActivatedRoute,
    private sportService:SportsService
    ){

    let tok= this.loginService.getJwtToken();

    let id=this.loginService.getIdUserParam();

    this.datos= this.fb.group({
      token:new FormControl(tok),
      id_sport:new FormControl(id),
      name:new FormControl(Validators.required)
    });

    this.id_sport = Number(this.activateRoute.snapshot.paramMap.get('id_sport'))
  }

  ngOnInit(): void {

    if(this.id_sport!=0){

      this.cargar(this.id_sport)

      }

  }

  cargar( id_sport:number):void{

    this.sportService.getSingleSportEdit(id_sport).subscribe(data=>{
    this.datos.patchValue({
      name:   data.name,
    })
    })
    }

      goBack(){
    this._location.back();
  }

    editar():void{

      let params={
        id_sport:this.datos.value.id_sport,
        token:this.datos.value.token,
        name:this.datos.value.name
      }

      if(this.datos.valid){
        this.httpclient.post('https://api.darmon.co/auth/edit-sport',params).subscribe(resp=>{
          ErrorInterceptor
          Notiflix.Notify.success('Deporte editado correctamente');
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
    this.sportService.deleteSport(this.id_sport!)
    .subscribe(()=>{
      Notiflix.Notify.success('Deporte eliminado');
      this._location.back();
    });
  }
}
