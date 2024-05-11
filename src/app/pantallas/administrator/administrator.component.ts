import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit{

  private token= 'token';

  private id_user='id_user';

  private id_store='id_store';

  tokenForm!:FormGroup;

  errors=false;

  constructor(private loginService:LoginService,private router:Router) {

    this.loginService.tokenValidate();

  }

  ms: any = '0' + 0;
  sec: any = '0' + 0;
  min: any = '0' + 0;
  hr: any = '0' + 0;

  startTimer: any;
  runing = false;

  start(): void{
    if(!this.runing){
      this.runing= true;
      this.startTimer= setInterval(()=>{
        this.ms++;
        this.ms = this.ms < 10? '0' + this.ms :this.ms;

        if(this.ms===100){
          this.sec++;
          this.sec= this.sec <10 ? '0' + this.sec : this.sec;
          this.ms='0' + 0;
        }

        if(this.sec===60){
          this.min++;
          this.min = this.min <10 ? '0'+ this.min : this.min;
          this.sec= '0'+ 0;
        }

        if(this.min===60){
          this.hr++;
          this.hr = this.hr < 10 ? '0'+ this.hr : this.hr;
          this.sec = '0'+ 0;
        }
      },10);
    }
  }

  reset():void{
    clearInterval(this.startTimer);
    this.runing=false;
    this.hr= this.min = this.sec = this.ms= '0'+ 0;
  }

  stop():void{
    clearInterval(this.startTimer);
    this.runing= false;
  }

  ngOnInit(): void {
    this.start();
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

  salir():void{
    this.loginService.logOut()
    .subscribe(()=>{
      localStorage.removeItem(this.id_user);
      localStorage.removeItem(this.token);
      localStorage.removeItem(this.id_store);
      console.log("Exit successfully");
      this.router.navigate(['/login']);
    })
  }

}
