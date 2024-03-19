import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pantallas/login/login.component';
import { AdministratorComponent } from './pantallas/administrator/administrator.component';
import { LoginGuard } from './guard/login.guard';
import { AuthGuard } from './guard/auth.guard';
import { AllUsersComponent } from './pantallas/administrator/users/all-users/all-users.component';
import { SportsClubsComponent } from './pantallas/administrator/clubs/sports-clubs/sports-clubs.component';
import { CategoryUsersComponent } from './pantallas/administrator/users/category-users/category-users.component';
import { EditUserComponent } from './pantallas/administrator/users/edit-user/edit-user.component';
import { RegisterUserComponent } from './pantallas/administrator/users/register-user/register-user.component';
import { EditClubsComponent } from './pantallas/administrator/clubs/edit-clubs/edit-clubs.component';
import { RegisterClubComponent } from './pantallas/administrator/clubs/register-club/register-club.component';
import { AllSportComponent } from './pantallas/administrator/sports/all-sport/all-sport.component';
import { RegisterSportsComponent } from './pantallas/administrator/sports/register-sports/register-sports.component';
import { EditSportComponent } from './pantallas/administrator/sports/edit-sport/edit-sport.component';
import { AllEntitiesComponent } from './pantallas/administrator/entities/all-entities/all-entities.component';
import { RegisterEntitiesComponent } from './pantallas/administrator/entities/register-entities/register-entities.component';
import { EditEntitiesComponent } from './pantallas/administrator/entities/edit-entities/edit-entities.component';
import { AllPaysComponent } from './pantallas/administrator/pay/all-pays/all-pays.component';
import { AllChatComponent } from './pantallas/administrator/chat/all-chat/all-chat.component';
import { ReplyChatComponent } from './pantallas/administrator/chat/reply-chat/reply-chat.component';
import { TypePayComponent } from './pantallas/administrator/pay/type-pay/type-pay.component';
import { TypeEventsComponent } from './pantallas/administrator/events/type-events/type-events.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent,canActivate:[LoginGuard]},
  {path:'administrator',component:AdministratorComponent,canActivate:[AuthGuard],children:[
    {path:'',redirectTo:'users',pathMatch:'full'},
    {path:'users',component:AllUsersComponent},
    {path:'clubs',component:SportsClubsComponent},
    {path:'edit-club/:id_club',component:EditClubsComponent},
    {path:'register-club',component:RegisterClubComponent},
    {path:'category-users/:id_module',component:CategoryUsersComponent},
    {path:'register-user',component:RegisterUserComponent},
    {path:'edit-user/:id_user',component:EditUserComponent},
    {path:'sports',component:AllSportComponent},
    {path:'edit-sport/:id_sport',component:EditSportComponent},
    {path:'register-sport',component:RegisterSportsComponent},
    {path:'entities',component:AllEntitiesComponent},
    {path:'register-entitie',component:RegisterEntitiesComponent},
    {path:'edit-entitie/:id_entitie',component:EditEntitiesComponent},
    {path:'pays',component:AllPaysComponent},
    {path:'type-pay/:type_pay',component:TypePayComponent},
    {path:'chat',component:AllChatComponent},
    {path:'reply-chat/:id_user',component:ReplyChatComponent},
    {path:'type-events',component:TypeEventsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
