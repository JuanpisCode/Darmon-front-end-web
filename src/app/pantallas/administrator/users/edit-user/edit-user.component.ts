import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import { LoginService } from 'src/app/services/login.service';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  loading: boolean = false;
  datos:FormGroup;
  public users:any=[];
  id_user: number;
  error=false;

  constructor(private httpclient:HttpClient,
    private loginService:LoginService,
    private _location:Location,
    private userService:UsersService,
    private fb:FormBuilder,
    private activateRoute:ActivatedRoute,
    ){

    let tok= this.loginService.getJwtToken();
    this.id_user = Number(this.activateRoute.snapshot.paramMap.get('id_user'));

    this.datos= this.fb.group({
      token:new FormControl(tok),
      id_user:new FormControl(this.id_user),
      state:new FormControl(Validators.required)
    });

  }

  public async obtenerUser(id_user:number){

    await this.userService.getSingleUser(id_user)
    .subscribe(resp=>{
      this.users= resp.response
    })
  }

  ngOnInit(): void {

    if(this.id_user!=0){

      this.cargar(this.id_user)

      }

      if(this.id_user!=0){
        this.obtenerUser(this.id_user)
      }
  }

  cargar( id_user:number):void{

    this.userService.getSingleUserEdit(id_user).subscribe(data=>{
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
        id_user:this.datos.value.id_user,
        token:this.datos.value.token,
        state:this.datos.value.state
      }

      if(this.datos.valid){
        this.httpclient.post('https://api.darmon.co/auth/edit-user',params).subscribe(resp=>{
          ErrorInterceptor
          Notiflix.Notify.success('Perfil editado correctamente');
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

  delete(id_user?:number):void{
    this.userService.deleteUser(id_user!)
    .subscribe(()=>{
      Notiflix.Notify.success('Usuario eliminado');
      this._location.back();
    });
  }

}
