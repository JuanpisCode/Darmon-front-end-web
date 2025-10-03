import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Response } from 'src/app/models/sport';
import { LoginService } from 'src/app/services/login.service';
import { SportsService } from 'src/app/services/sports.service';

@Component({
  selector: 'app-all-sport',
  templateUrl: './all-sport.component.html',
  styleUrls: ['./all-sport.component.scss']
})
export class AllSportComponent implements OnInit{

  public sports:any=[];
  public search:string ='';
  errors=false;
  tokenForm!:FormGroup;
  length=1;

  constructor(
    private sportService:SportsService,
    private loginService:LoginService
  ){

  }

  ngOnInit(): void {

    this.obtenerSports(this.length);

  }

  onScroll():void{

    this.obtenerSports(++this.length);

  }

  obtenerSports(length:number){
    this.sportService.getSports(length)
    .subscribe((sports:Response[])=>{
      this.sports= sports;
      this.refreshToken();
    });
  }

  onSearchUser(search: string){
    this.search =search;

  }

  refreshToken(){

    let id=this.loginService.getIdUserParam();
    let tok='ksaisaiuisabt6tqt26632vgdvf632g72h2e8gdtf6defg7e2hfuib2eg73287hf7bg2c7wvg623vg76vdb8y32nf89n98nf276b2'

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
