import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginCompComponent } from './components/login-comp/login-comp.component';
import { RegisterCompComponent } from './components/register-comp/register-comp.component';
import { ForgotPasswordCompComponent } from './components/forgot-password-comp/forgot-password-comp.component';
import { LandingpageComponent } from './client/User/landingpage/landingpage.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [AppComponent, LoginCompComponent, RegisterCompComponent, ForgotPasswordCompComponent, LandingpageComponent, HeaderComponent, CardComponent, DetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
