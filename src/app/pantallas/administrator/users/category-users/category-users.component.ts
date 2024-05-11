import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-category-users',
  templateUrl: './category-users.component.html',
  styleUrls: ['./category-users.component.scss']
})
export class CategoryUsersComponent {

  public users:any=[];
  public search:string ='';
  id_module:number;
  errors=false;
  tokenForm!:FormGroup;
  length=1;

  constructor(
    private activateRoute:ActivatedRoute,
    private userService:UsersService,
    private _location:Location,
    private loginService:LoginService,
  ){
    this.id_module = Number(this.activateRoute.snapshot.paramMap.get('id_module'))
  }

  ngOnInit(): void {
    if(this.id_module!=0){
      this.obtenerUsers(this.id_module,this.length)
    }


  }

  onScroll():void{

    this.obtenerUsers(this.id_module,++this.length);

  }

  obtenerUsers(id_module:number, length:number){

    this.userService.getUsersClub(id_module,length)
    .subscribe(resp=>{
      this.users=resp;
      this.refreshToken();
    })
  }

  goBack(){
    this._location.back();
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
