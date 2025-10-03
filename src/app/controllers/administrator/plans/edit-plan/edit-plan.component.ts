import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PlansService } from 'src/app/services/plans.service';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent {

  loading: boolean = false;
  datos:FormGroup;
  public plans:any=[];
  id_payment_plan: number;
  error=false;

  constructor(
    private httpclient:HttpClient,
    private loginService:LoginService,
    private _location:Location,
    private fb:FormBuilder,
    private activateRoute:ActivatedRoute,
    private planService:PlansService
  ){

    let tok= this.loginService.getJwtToken();

    let id=this.loginService.getIdUserParam();

    this.datos=this.fb.group({
      token:new FormControl(tok),
      name:new FormControl(Validators.required),
      price:new FormControl(Validators.required),
      content:new FormControl(Validators.required),
      id_user:new FormControl(id)
    });

    this.id_payment_plan= Number(this.activateRoute.snapshot.paramMap.get('id_payment_plan'))
  }

  ngOnInit(): void {

    if(this.id_payment_plan!=0){

      this.getPlan(this.id_payment_plan)
      }
  }

  getPlan(id_payment_plan:number):void{
    this.planService.getSinglePlan(id_payment_plan)
    .subscribe(data=>{
      this.datos.patchValue({
        name: data.name,
        price: data.price,
        content: data.content
      });

    })
  }



  goBack(){
    this._location.back();
  }

  editar():void{

    let params={
      token:this.datos.value.token,
      id_payment_plan:this.id_payment_plan,
      name:this.datos.value.name,
      price:this.datos.value.price,
      content:this.datos.value.content,
      id_user:this.datos.value.id_user
    }

    if(this.datos.valid){
      this.httpclient.post('https://api.darmon.co/auth/edit-plan',params).subscribe(resp=>{
        ErrorInterceptor
        Notiflix.Notify.success('Plan editado correctamente');
        this._location.back();
      })
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
  this.planService.deletePlan(this.id_payment_plan!)
  .subscribe(()=>{
    Notiflix.Notify.success('Plan eliminado');
    this._location.back();
  });
}
}
