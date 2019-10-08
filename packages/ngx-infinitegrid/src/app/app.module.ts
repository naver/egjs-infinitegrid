import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxInfinitegridModule } from 'projects/ngx-infinitegrid/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxInfinitegridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
