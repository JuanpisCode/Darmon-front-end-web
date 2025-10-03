import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common'
import { EntitiesService } from 'src/app/services/entities.service';

@Component({
  selector: 'app-edit-entities',
  templateUrl: './edit-entities.component.html',
  styleUrls: ['./edit-entities.component.scss']
})
export class EditEntitiesComponent {

  loading: boolean = false;
  datos:FormGroup;
  public entities:any=[];
  id_entitie: number;
  error=false;

  constructor(private httpclient:HttpClient,
    private loginService:LoginService,
    private _location:Location,
    private fb:FormBuilder,
    private activateRoute:ActivatedRoute,
    private entitieService:EntitiesService
    ){

    let tok= this.loginService.getJwtToken();

    let id=this.loginService.getIdUserParam();

    this.datos= this.fb.group({
      token:new FormControl(tok),
      id_user:new FormControl(id),
      state:new FormControl(Validators.required)
    });

    this.id_entitie = Number(this.activateRoute.snapshot.paramMap.get('id_entitie'))
  }

  public async obtenerEntitie(id_entitie:number){

    await this.entitieService.getSingleEntitie(id_entitie)
    .subscribe(resp=>{
      this.entities= resp.response
    })
  }

  ngOnInit(): void {

    if(this.id_entitie!=0){

      this.cargar(this.id_entitie)

      }

      if(this.id_entitie!=0){
        this.obtenerEntitie(this.id_entitie)
      }
  }

  cargar( id_entitie:number):void{

    this.entitieService.getSingleEntitieEdit(id_entitie).subscribe(data=>{
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
        id_entitie:this.id_entitie,
        token:this.datos.value.token,
        state:this.datos.value.state
      }

      if(this.datos.valid){
        this.httpclient.post('https://api.darmon.co/auth/edit-entitie',params).subscribe(resp=>{
          ErrorInterceptor
          Notiflix.Notify.success('Entidad editada correctamente');
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

  delete(id_entitie?:number):void{
    this.entitieService.deleteEntitie(id_entitie!)
    .subscribe(()=>{
      Notiflix.Notify.success('Entidad eliminado');
      this._location.back();
    });
  }

}
