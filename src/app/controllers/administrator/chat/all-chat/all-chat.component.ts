import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ChatService } from 'src/app/services/chat.services';
import * as Notiflix from 'notiflix';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-chat',
  templateUrl: './all-chat.component.html',
  styleUrls: ['./all-chat.component.scss']
})
export class AllChatComponent {

  public search:string ='';
  public chats:any=[];
  private idUser='idUser';
  leido:boolean= false;
  noLeido:boolean= false;
  errors=false;
  length=1;
  tokenForm!:FormGroup;

  onSearchUser(search: string){
    this.search =search;

  }

  constructor(
    private chatService:ChatService,
    private _location:Location,
    private loginService:LoginService,
    private httpclient:HttpClient,
  ){

  }

  ngOnInit(): void {
      this.obtenerUsers(this.length);
  }

  onScroll():void{

    this.obtenerUsers(++this.length);

  }

  obtenerUsers(length:number){

    this.chatService.getNotificationChat(length)
    .subscribe(resp=>{
      this.chats=resp;
      this.refreshToken();
    });

  }

  goBack(){
    this._location.back();
  }

  leer(read:string){
    if(read=='false'){
      this.noLeido=true;
      this.leido=false;

    }
    if(read=='true'){
      this.noLeido=false;
      this.leido=true;

    }

  }

  displayStyle= "none";

  openPopup(id_user?:number){
    var stU:string = String(id_user);
    this.displayStyle= "block";
    localStorage.setItem(this.idUser,stU);
  }

  closePopup(){
    this.displayStyle= "none";
    localStorage.removeItem(this.idUser);
  }

  delete():void{
    let tok=this.loginService.getJwtToken();

    let params={
      token:tok,
      id_user:this.idUser
    };

    this.httpclient.post('https://api.darmon.co/auth/get-notification-chat',params).subscribe(
      ()=>{
        Notiflix.Notify.success('Notificación eliminado');
        this.closePopup();
      }
    )

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
