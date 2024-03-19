import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-users',
  templateUrl: './category-users.component.html',
  styleUrls: ['./category-users.component.scss']
})
export class CategoryUsersComponent {

  public users:any=[];
  public search:string ='';
  id_module:number;


  constructor(
    private activateRoute:ActivatedRoute,
    private userService:UsersService,
    private _location:Location,
  ){
    this.id_module = Number(this.activateRoute.snapshot.paramMap.get('id_module'))
  }

  ngOnInit(): void {
    if(this.id_module!=0){
      this.obtenerUsers(this.id_module)
    }


  }

  public async obtenerUsers(id_module:number){

    await this.userService.getUsersClub(id_module)
    .subscribe(resp=>{
      this.users=resp
    })
  }

  goBack(){
    this._location.back();
  }

  onSearchUser(search: string){
    this.search =search;

  }
}
