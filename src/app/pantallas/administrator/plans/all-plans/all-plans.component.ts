import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Payment_plans } from 'src/app/models/payment_plans';
import { LoginService } from 'src/app/services/login.service';
import { PlansService } from 'src/app/services/plans.service';

@Component({
  selector: 'app-all-plans',
  templateUrl: './all-plans.component.html',
  styleUrls: ['./all-plans.component.scss']
})
export class AllPlansComponent {

  public plans: any=[];
  tokenForm!:FormGroup;
  errors=false;
  length=1;
  public search:string ='';

  constructor(
    private loginService:LoginService,
    private planService:PlansService
  ){}

  ngOnInit():void{

    this.getPlans(this.length);
  }

  onScroll():void{

    this.getPlans(++this.length);

  }

  getPlans(length:number){

    this.planService.getPlans(length).
    subscribe((plans:Payment_plans[])=>{
      this.plans=plans;
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
