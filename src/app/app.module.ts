import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  TUI_SANITIZER,
  TuiButtonModule,
  TuiDataListModule, TuiDialogModule,
  TuiErrorModule,
  TuiLoaderModule,
  TuiRootModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TuiComboBoxModule, TuiDataListWrapperModule, TuiFieldErrorPipeModule, TuiInputModule} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiLetModule} from "@taiga-ui/cdk";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {NewDialogComponent} from "./new-dialog/new-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    NewDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    FormsModule,
    ReactiveFormsModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiDataListModule,
    TuiLoaderModule,
    TuiButtonModule,
    TuiLetModule,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiDialogModule
  ],
  providers: [
    {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
