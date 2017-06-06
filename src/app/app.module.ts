import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DialogModule } from './dialog';
import { TreeModule } from './tree';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DialogModule,
    TreeModule
  ],
  providers: [],
  entryComponents: [
    TestComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
