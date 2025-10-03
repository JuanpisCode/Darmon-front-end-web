import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './controllers/login/login.component';
import { AdministratorComponent } from './controllers/administrator/administrator.component';
import { LoginGuard } from './guard/login.guard';
import { AuthGuard } from './guard/auth.guard';
import { AllUsersComponent } from './controllers/administrator/users/all-users/all-users.component';
import { SportsClubsComponent } from './controllers/administrator/clubs/sports-clubs/sports-clubs.component';
import { CategoryUsersComponent } from './controllers/administrator/users/category-users/category-users.component';
import { EditUserComponent } from './controllers/administrator/users/edit-user/edit-user.component';
import { RegisterUserComponent } from './controllers/administrator/users/register-user/register-user.component';
import { EditClubsComponent } from './controllers/administrator/clubs/edit-clubs/edit-clubs.component';
import { RegisterClubComponent } from './controllers/administrator/clubs/register-club/register-club.component';
import { AllSportComponent } from './controllers/administrator/sports/all-sport/all-sport.component';
import { RegisterSportsComponent } from './controllers/administrator/sports/register-sports/register-sports.component';
import { EditSportComponent } from './controllers/administrator/sports/edit-sport/edit-sport.component';
import { AllEntitiesComponent } from './controllers/administrator/entities/all-entities/all-entities.component';
import { RegisterEntitiesComponent } from './controllers/administrator/entities/register-entities/register-entities.component';
import { EditEntitiesComponent } from './controllers/administrator/entities/edit-entities/edit-entities.component';
import { AllPaysComponent } from './controllers/administrator/pay/all-pays/all-pays.component';
import { AllChatComponent } from './controllers/administrator/chat/all-chat/all-chat.component';
import { ReplyChatComponent } from './controllers/administrator/chat/reply-chat/reply-chat.component';
import { TypePayComponent } from './controllers/administrator/pay/type-pay/type-pay.component';
import { TypeEventsComponent } from './controllers/administrator/events/type-events/type-events.component';
import { AllPlansComponent } from './controllers/administrator/plans/all-plans/all-plans.component';
import { RegisterPlanComponent } from './controllers/administrator/plans/register-plan/register-plan.component';
import { EditPlanComponent } from './controllers/administrator/plans/edit-plan/edit-plan.component';
import { AllSubscriptionsComponent } from './controllers/administrator/subscriptions/all-subscriptions/all-subscriptions.component';
import { EditSubscriptionComponent } from './controllers/administrator/subscriptions/edit-subscription/edit-subscription.component';
import { RegisterSubscriptionComponent } from './controllers/administrator/subscriptions/register-subscription/register-subscription.component';
import { HomeComponent } from './controllers/administrator/home/home.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent,canActivate:[LoginGuard]},
  {path:'administrator',component:AdministratorComponent,canActivate:[AuthGuard],children:[
    {path:'',redirectTo:'users',pathMatch:'full'},
    {path:'users',component:AllUsersComponent},
    {path:'home',component:HomeComponent},
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
    {path:'all-plans',component:AllPlansComponent},
    {path:'register-plan',component:RegisterPlanComponent},
    {path:'edit-plan/:id_payment_plan',component:EditPlanComponent},
    {path:'all-subscription',component:AllSubscriptionsComponent},
    {path:'edit-subscription/:id_user/:id_payment_plan',component:EditSubscriptionComponent},
    {path:'register-subscription',component:RegisterSubscriptionComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
