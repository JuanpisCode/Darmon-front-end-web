import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'src/app/models/subscription';
import { LoginService } from 'src/app/services/login.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-all-subscriptions',
  templateUrl: './all-subscriptions.component.html',
  styleUrls: ['./all-subscriptions.component.scss']
})
export class AllSubscriptionsComponent {

  public subscriptions: any=[];
  tokenForm!:FormGroup;
  errors=false;
  length=1;
  public search:string ='';

  constructor(
    private loginService:LoginService,
    private subscriptionService:SubscriptionService
  ){}

  ngOnInit():void{

    this.getSubscriptons(this.length);
  }

  onScroll():void{

    this.getSubscriptons(++this.length);

  }
  getSubscriptons(length:number){

    this.subscriptionService.getSubscriptions(length).
    subscribe((subscriptions:Subscription[])=>{
      this.subscriptions=subscriptions;
      this.refreshToken();
    })
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
