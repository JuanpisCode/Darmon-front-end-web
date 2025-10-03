import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Response } from 'src/app/models/entitie';
import { EntitiesService } from 'src/app/services/entities.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-all-entities',
  templateUrl: './all-entities.component.html',
  styleUrls: ['./all-entities.component.scss']
})
export class AllEntitiesComponent implements OnInit{

  public entities:any=[];
  public search:string ='';
  errors=false;
  tokenForm!:FormGroup;
  length=1;

  constructor(
    private entitieService:EntitiesService,
    private loginService:LoginService
  ){

  }

  ngOnInit(): void {

      this.getEntities(this.length);


  }

  onScroll():void{

    this.getEntities(++this.length);

  }


  getEntities(length:number){

   this.entitieService.getEntities(length)
    .subscribe((entities:Response[])=>{
      this.entities= entities;
      this.refreshToken();
    });
  }

  onSearchUser(search: string){
    this.search =search;

  }

  refreshToken(){

    let id=this.loginService.getIdUserParam();
    let tok='ksaisaiuisabt6tqt26632vgdvf632g72h2e8gdtf6defg7e2hfuib2eg73287hf7bg2c7wvg623vg76vdb8y32nf89n98nf276b2';

    this.tokenForm= new FormGroup({
      id_user:new FormControl(id),
      token:new FormControl(tok)
    })

    let param={
      id_user:this.tokenForm.value.id_user,
      token:this.tokenForm.value.token,
    }
    this.loginService.refreshToken(param)
    .subscribe(resp=>{
      this.errors = resp === 400;
        this.errors= resp===401;
    })
  }
}
