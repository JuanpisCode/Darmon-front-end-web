import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PayService } from 'src/app/services/pay.service';
import { ClubsService } from 'src/app/services/clubs.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-type-pay',
  templateUrl: './type-pay.component.html',
  styleUrls: ['./type-pay.component.scss']
})
export class TypePayComponent{

  type_pay:number;
  name!:string;
  dataClub:any;
  item:any;
  public pays: any=[];
  id_1:Boolean =false;
  id_2:Boolean =false;
  keyword='name';
  private year='year';
  private id_club='id_club';

  years=[
    {'name':'2024'},{'name':'2023'},{'name':'2022'},{'name':'2021'},{'name':'2020'},
    {'name':'2019'},{'name':'2018'},{'name':'2017'},{'name':'2016'},{'name':'2015'},
    {'name':'2014'},{'name':'2013'},{'name':'2012'},{'name':'2011'},{'name':'2010'},
    {'name':'2009'},{'name':'2008'},{'name':'2007'},{'name':'2006'},{'name':'2005'},
    {'name':'2004'},{'name':'2003'},{'name':'2002'},{'name':'2001'},{'name':'2000'},
    {'name':'1999'},{'name':'1998'},{'name':'1997'},{'name':'1996'},{'name':'1995'},
    {'name':'1994'},{'name':'1993'},{'name':'1992'},{'name':'1990'},{'name':'1991'},
  ];

  datos:FormGroup;

  constructor(
    private activateRoute:ActivatedRoute,
    private _location:Location,
    private payService:PayService,
    private clubService:ClubsService,
    private Httpclient:HttpClient,
    private loginService:LoginService,
  ){

    this.type_pay = Number(this.activateRoute.snapshot.paramMap.get('type_pay'))

    this.datos=new FormGroup({
      month:new FormControl('',Validators.required),
    });
  }

  ngOnInit(): void {
    if(this.type_pay!=0){
      if(this.type_pay==1){
         this.name='Pagos Darmon';
         this.getPayments();
         this.id_1=true;
         this.id_2=false;
      }
      if(this.type_pay==2){
        this.name='Pagos deportivos';
        this.id_1=false;
        this.id_2=true;
        this.clubService.getClubsArray()
        .subscribe(resp=>{
          this.dataClub=resp
        })
      }
    }

  }

  selectEventYear(item:any){
    localStorage.removeItem(this.year);
    localStorage.setItem(this.year, item.name)
  }

  selectEventClub(item:any){
    localStorage.removeItem(this.id_club);
    localStorage.setItem(this.id_club, item.id_club)
  }

  goBack(){
    this._location.back();
  }

  public async getPayments(){
    await this.payService.getPayments()
    .subscribe(resp=>{
      this.pays=resp;
    })
  }

  getPaySportman(){
    let idC=localStorage.getItem(this.id_club);
    let Y=localStorage.getItem(this.year);
    let tok= this.loginService.getJwtToken();


    let params={
      token:tok,
      id_club:idC,
      year:Y,
      month:this.datos.value.month
    }

    if(this.datos.valid){
      this.Httpclient.post('https://api.darmon.co/auth/get-pay-sportman',params).subscribe(resp=>{
        this.pays=resp;
      });

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

    let tok= this.loginService.getJwtToken();
    let idC=localStorage.getItem(this.id_club);
    let Y=localStorage.getItem(this.year);

    let params={
      token:tok,
      id_club:idC,
      month:this.datos.value.month,
      year:Y
    }

    if(this.datos.valid){
      if(idC!=null){
        if(Y!=null){
          this.Httpclient.post('https://api.darmon.co/auth/delete-paysportman',params).subscribe(()=>{
            ErrorInterceptor
                Notiflix.Notify.success('Listado eliminado');
                this.closePopup();
                this.getPaySportman();
                localStorage.removeItem(this.id_club);
                localStorage.removeItem(this.year);
          });
        }else{
      alert('Error! no has seleccionado ningun año');
        }

      }else{
      alert('Error! no has seleccionado ningun club');
      }

    }else{
      alert('Error! no has seleccionado ningun mes');
    }

  }

}
