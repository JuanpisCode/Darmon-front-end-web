import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ChatService } from 'src/app/services/chat.services';
import * as Notiflix from 'notiflix';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';

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
      this.obtenerUsers()
  }

  public async obtenerUsers(){

    await this.chatService.getNotificationChat()
    .subscribe(resp=>{
      this.chats=resp
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

}
