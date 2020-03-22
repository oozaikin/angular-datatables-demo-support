import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LMultiEventViewComponent } from './datatables/l-multi-event-view.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, LMultiEventViewComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
