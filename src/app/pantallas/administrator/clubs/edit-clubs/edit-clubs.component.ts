import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';
import { ClubsService } from 'src/app/services/clubs.service';

@Component({
  selector: 'app-edit-clubs',
  templateUrl: './edit-clubs.component.html',
  styleUrls: ['./edit-clubs.component.scss']
})
export class EditClubsComponent implements OnInit{

  loading: boolean = false;
  datos:FormGroup;
  public clubs:any=[];
  id_club: number;
  error=false;

  constructor(private httpclient:HttpClient,
    private loginService:LoginService,
    private _location:Location,
    private fb:FormBuilder,
    private activateRoute:ActivatedRoute,
    private clubService:ClubsService
    ){

    let tok= this.loginService.getJwtToken();

    let id=this.loginService.getIdUserParam();

    this.datos= this.fb.group({
      token:new FormControl(tok),
      id_user:new FormControl(id),
      state:new FormControl(Validators.required)
    });

    this.id_club = Number(this.activateRoute.snapshot.paramMap.get('id_club'))
  }

  public async obtenerClub(id_club:number){

    await this.clubService.getSingleClub(id_club)
    .subscribe(resp=>{
      this.clubs= resp.response
    })
  }

  ngOnInit(): void {

    if(this.id_club!=0){

      this.cargar(this.id_club)

      }

      if(this.id_club!=0){
        this.obtenerClub(this.id_club)
      }
  }

  cargar( id_club:number):void{

    this.clubService.getSingleClubEdit(id_club).subscribe(data=>{
    this.datos.patchValue({
      state:   data.state,
    })
    })
    }

      goBack(){
    this._location.back();
  }

    editar():void{

      let params={
        id_club:this.id_club,
        token:this.datos.value.token,
        state:this.datos.value.state
      }

      if(this.datos.valid){
        this.httpclient.post('https://api.darmon.co/auth/edit-club',params).subscribe(resp=>{
          ErrorInterceptor
          Notiflix.Notify.success('Club editado correctamente');
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

  delete(id_club?:number):void{
    this.clubService.deleteClub(id_club!)
    .subscribe(()=>{
      Notiflix.Notify.success('Club eliminado');
      this._location.back();
    });
  }

}
