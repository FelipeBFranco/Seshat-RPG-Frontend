import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordModule } from '../components/reset-password/reset-password-form.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule ,
    LoginPageModule,
    HttpClientModule,
    ToastModule,
    ResetPasswordModule
  ],
  providers: [provideHttpClient(withFetch()), MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
