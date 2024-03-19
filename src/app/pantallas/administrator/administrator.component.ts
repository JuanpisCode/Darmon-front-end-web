import { Component, OnInit } from '@angular/core';
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

  constructor(private loginService:LoginService,private router:Router) {

    this.loginService.tokenValidate()
  }

  ngOnInit(): void {

  }

  salir():void{
    this.loginService.logOut()
    .subscribe(()=>{
      localStorage.removeItem(this.id_user);
      localStorage.removeItem(this.token);
      localStorage.removeItem(this.id_store);
      console.log("Exit successfully");
      this.router.navigate(['/login'])
    })
  }

}
