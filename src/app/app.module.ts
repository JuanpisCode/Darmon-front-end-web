import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pantallas/login/login.component';
import { AdministratorComponent } from './pantallas/administrator/administrator.component';
import { LoadingComponent } from './loading/loading.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingInterceptor } from './helpers/loading.interceptor';
import { RouterModule } from '@angular/router';
import { AllUsersComponent } from './pantallas/administrator/users/all-users/all-users.component';
import { CategoryUsersComponent } from './pantallas/administrator/users/category-users/category-users.component';
import { RegisterUserComponent } from './pantallas/administrator/users/register-user/register-user.component';
import { EditUserComponent } from './pantallas/administrator/users/edit-user/edit-user.component';
import { SportsClubsComponent } from './pantallas/administrator/clubs/sports-clubs/sports-clubs.component';
import { EditClubsComponent } from './pantallas/administrator/clubs/edit-clubs/edit-clubs.component';
import { AllEntitiesComponent } from './pantallas/administrator/entities/all-entities/all-entities.component';
import { AllSportComponent } from './pantallas/administrator/sports/all-sport/all-sport.component';
import { RegisterEntitiesComponent } from './pantallas/administrator/entities/register-entities/register-entities.component';
import { EditEntitiesComponent } from './pantallas/administrator/entities/edit-entities/edit-entities.component';
import { RegisterSportsComponent } from './pantallas/administrator/sports/register-sports/register-sports.component';
import { BuscadorUserPipe } from './pipe/buscador-user.pipe';
import { BuscadorClubPipe } from './pipe/buscador-club.pipe';
import { RegisterClubComponent } from './pantallas/administrator/clubs/register-club/register-club.component';
import { BuscadorSportPipe } from './pipe/buscador-sport.pipe';
import { EditSportComponent } from './pantallas/administrator/sports/edit-sport/edit-sport.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BuscadorEntitiePipe } from './pipe/buscador-entitie.pipe';
import { AllPaysComponent } from './pantallas/administrator/pay/all-pays/all-pays.component';
import { AllChatComponent } from './pantallas/administrator/chat/all-chat/all-chat.component';
import { ReplyChatComponent } from './pantallas/administrator/chat/reply-chat/reply-chat.component';
import { BuscadorNotificationChatPipe } from './pipe/buscador-notification-chat.pipe';
import { BuscadorChatPipe } from './pipe/buscador-chat.pipe';
import { TypePayComponent } from './pantallas/administrator/pay/type-pay/type-pay.component';
import { TypeEventsComponent } from './pantallas/administrator/events/type-events/type-events.component';
import { EditEventsComponent } from './pantallas/administrator/events/edit-events/edit-events.component';
import { NgxCopyPasteDirective } from 'ngx-copypaste';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AllPlansComponent } from './pantallas/administrator/plans/all-plans/all-plans.component';
import { RegisterPlanComponent } from './pantallas/administrator/plans/register-plan/register-plan.component';
import { EditPlanComponent } from './pantallas/administrator/plans/edit-plan/edit-plan.component';
import { AllSubscriptionsComponent } from './pantallas/administrator/subscriptions/all-subscriptions/all-subscriptions.component';
import { EditSubscriptionComponent } from './pantallas/administrator/subscriptions/edit-subscription/edit-subscription.component';
import { BuscadorPlanPipe } from './pipe/buscador-plan.pipe';
import { BuscadorSubscriptionPipe } from './pipe/buscador-subscription.pipe';
import { RegisterSubscriptionComponent } from './pantallas/administrator/subscriptions/register-subscription/register-subscription.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdministratorComponent,
    LoadingComponent,
    AllUsersComponent,
    CategoryUsersComponent,
    RegisterUserComponent,
    EditUserComponent,
    SportsClubsComponent,
    EditClubsComponent,
    AllEntitiesComponent,
    AllSportComponent,
    RegisterEntitiesComponent,
    EditEntitiesComponent,
    RegisterSportsComponent,
    BuscadorUserPipe,
    BuscadorClubPipe,
    RegisterClubComponent,
    BuscadorSportPipe,
    EditSportComponent,
    BuscadorEntitiePipe,
    AllPaysComponent,
    AllChatComponent,
    ReplyChatComponent,
    BuscadorNotificationChatPipe,
    BuscadorChatPipe,
    TypePayComponent,
    TypeEventsComponent,
    EditEventsComponent,
    AllPlansComponent,
    RegisterPlanComponent,
    EditPlanComponent,
    AllSubscriptionsComponent,
    EditSubscriptionComponent,
    BuscadorPlanPipe,
    BuscadorSubscriptionPipe,
    RegisterSubscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    AutocompleteLibModule,
    NgxCopyPasteDirective,
    InfiniteScrollModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true}
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
