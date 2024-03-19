import { Component, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.services';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-reply-chat',
  templateUrl: './reply-chat.component.html',
  styleUrls: ['./reply-chat.component.scss']
})
export class ReplyChatComponent {

  @ViewChild('endOfChat')
  endOfChat!:ElementRef;

  public search:string ='';
  public users:any=[];
  public userMes:any=[];
  public chats:any=[];
  private id_chat='id_chat';
  private idUser='idUser';
  id_user: number;
  messages:FormGroup;
  hour:number;

  constructor(
    private _location:Location,
    private userService:UsersService,
    private activateRoute:ActivatedRoute,
    private chatService:ChatService,
    private fb:FormBuilder,
    private loginService:LoginService,
    private httpclient:HttpClient,
  ){


    let d= new Date().getUTCDay();
    let m= new Date().getUTCMonth();
    let y= new Date().getFullYear();
    let h= new Date().getHours();
    let mt= new Date().getMinutes();
    let tok= this.loginService.getJwtToken();
    this.hour=new Date().getHours();
    this.id_user = Number(this.activateRoute.snapshot.paramMap.get('id_user'));

    this.messages=this.fb.group({
      token: new FormControl(tok),
      id_user:new FormControl(this.id_user),
      message: new FormControl('',Validators.required),
      day:new FormControl(d),
      month:new FormControl(m),
      year:new FormControl(y),
      hour:new FormControl(h),
      minute:new FormControl(mt),
    })
  }

  ngOnInit(): void {

    if(this.id_user!=0){

      this.infoUser(this.id_user);
      this.getChat(this.id_user);

      }
        this.meridiemH(this.hour);

    }

  onSearchUser(search: string){
    this.search =search;

  }

  goBack(){
    this._location.back();
  }

  infoUser(id_user:number):void{
    this.userService.getSingleUser(id_user)
    .subscribe(resp=>{
      this.users=resp.response
    })
  }

  getChat(id_user:number):void{
    this.chatService.getChat(id_user)
    .subscribe(resp=>{
      this.chats= resp;
      this.scrollToBottom();
    })
  }

  mh!: string;

  meridiemH(hour:number){

    if(hour<=12){
    this.mh='a.m';

    }
    if(hour>12){
    this.mh='p.m';
    }
  }

  displayStyle= "none";

  openPopup(id_chat?:number,id_user?:number){
    this.displayStyle= "block";
    var stc:string = String(id_chat);
    var stU:string = String(id_user);
    localStorage.removeItem(this.id_chat);
    localStorage.removeItem(this.idUser);
    localStorage.setItem(this.id_chat,stc);
    localStorage.setItem(this.idUser,stU);
  }
  closePopup(){
    this.displayStyle= "none";
  }

  sendMessage():void{
    let params={
      token:this.messages.value.token,
      id_user:this.messages.value.id_user,
      message:this.messages.value.message,
      isMe:'true',
      day:this.messages.value.day,
      month:this.messages.value.month,
      year:this.messages.value.year,
      hour:this.messages.value.hour,
      minute:this.messages.value.minute,
      meridiem:this.mh
    }

    if(this.messages.valid){
      this.httpclient.post('https://api.darmon.co/auth/send-chat-admin',params).subscribe(
        resp=>{
          ErrorInterceptor
          this.getChat(this.id_user);
          this.scrollToBottom();
        }
      );

    }else{
      alert('Error! no hay ningun mensaje para enviar');
    }
  }

  scrollToBottom(){
    setTimeout(()=>{
      if(this.endOfChat){
        this.endOfChat.nativeElement.scrollIntoView({ behavior: "smooth"});
      }
    },100);

  }

  delete():void{
    let idU=localStorage.getItem(this.idUser);
    let idC=localStorage.getItem(this.id_chat);
    let tok= this.loginService.getJwtToken();

    let params={
      token:tok,
      id_user:idU,
      id_chat:idC
    }

    this.httpclient.post('https://api.darmon.co/auth/delete-message',params).subscribe(()=>{
      ErrorInterceptor
          Notiflix.Notify.success('Mensaje eliminado');
          this.getChat(this.id_user);
          this.closePopup();
          localStorage.removeItem(this.id_chat);
          localStorage.removeItem(this.idUser);
    });

  }

}
