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

  constructor(
    private Httpclient:HttpClient,
    private loginService:LoginService,
    private sportService:SportsService
  ){

  }

  ngOnInit():void{

    this.sportService.getSportsArray()
    .subscribe(resp=>{
      this.dataSport=resp;
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
        }
      )
    }else{
      alert('Error! no se encuentra seleccionado ningun deporte');
    }
  }
}
