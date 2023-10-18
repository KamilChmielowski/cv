import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularSvgIconModule.forRoot(),
    BrowserModule,
    HeaderComponent,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
