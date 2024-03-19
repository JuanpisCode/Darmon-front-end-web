import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errors=false;

  constructor(private fb:FormBuilder,private loginService: LoginService,private router:Router) {

  }

  onSubmit(){
    this.loginService.login({
      username:this.loginForm.value.username,
      password:this.loginForm.value.password,
      id_module:this.loginForm.value.id_module,
      id_user:this.loginForm.value.id_user,
      token:this.loginForm.value.token
    })
    .subscribe(resp=>
      {this.errors = resp === 400;
        this.errors= resp===401;
        this.errors= resp===403;
        this.errors= resp===424;
        ErrorInterceptor;
      this.router.navigate(['/administrator'])
      }
      )
  }

  ngOnInit(): void {

    this.loginForm= this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      id_module:'1',
      token:'ksaisaiuisabt6tqt26632vgdvf632g72h2e8gdtf6defg7e2hfuib2eg73287hf7bg2c7wvg623vg76vdb8y32nf89n98nf276b2'
    })
  }


}
