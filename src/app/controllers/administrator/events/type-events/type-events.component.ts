import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { SportsService } from 'src/app/services/sports.service';

@Component({
  selector: 'app-type-events',
  templateUrl: './type-events.component.html',
  styleUrls: ['./type-events.component.scss']
})
export class TypeEventsComponent {

  private id_sport='id_sport';
  public events: any=[];
  item:any;
  dataSport:any;
  keyword='name';
  errors=false;
  tokenForm!:FormGroup;
  length=1;

  constructor(
    private Httpclient:HttpClient,
    private loginService:LoginService,
    private sportService:SportsService
  ){

  }

  ngOnInit():void{

    this.getSports(this.length);

  }

  getSports(length:number){
    this.sportService.getSportsArray(length)
    .subscribe(resp=>{
      this.dataSport=resp;
      this.refreshToken();
    })
  }

  selectEventSport(item:any){
    localStorage.removeItem(this.id_sport);
    localStorage.setItem(this.id_sport, item.id_sport)
  }

  getEventsSport(){
    let idS=localStorage.getItem(this.id_sport);
    let tok= this.loginService.getJwtToken();

    let params={
      token:tok,
      id_sport:idS
    };

    if(this.id_sport!=null){
      this.Httpclient.post('https://api.darmon.co/auth/get-events-sport',params).subscribe(
        resp=>{
          this.events= resp;
      this.refreshToken();
        }
      )
    }else{
      alert('Error! no se encuentra seleccionado ningun deporte');
    }
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
