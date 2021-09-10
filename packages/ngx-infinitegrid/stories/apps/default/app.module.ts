import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NgxInfiniteGridModule } from "../../../projects/ngx-infinitegrid/src/public-api";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxInfiniteGridModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
