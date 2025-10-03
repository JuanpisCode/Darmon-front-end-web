import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Response } from 'src/app/models/club';
import { ClubsService } from 'src/app/services/clubs.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sports-clubs',
  templateUrl: './sports-clubs.component.html',
  styleUrls: ['./sports-clubs.component.scss']
})
export class SportsClubsComponent {

  public clubs:any=[];
  public search:string ='';
  errors=false;
  tokenForm!:FormGroup;
  length=1;
  constructor(
    private clubService:ClubsService,
    private loginService:LoginService
  ){

  }

  ngOnInit(): void {

      this.obtenerClubs(this.length);
  }

  onScroll():void{

    this.obtenerClubs(++this.length);

  }

  public async obtenerClubs(length:number){

    await this.clubService.getClubsArray(length)
    .subscribe((clubs:Response[])=>{
      this.clubs= clubs;
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
