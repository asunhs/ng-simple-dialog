import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { DialogPanelComponent } from './dialog-panel/dialog-panel.component';

import { Dialog, DialogService } from './dialog.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DialogComponent,
    DialogPanelComponent
  ],
  providers: [
    DialogService
  ],
  exports: [
    DialogPanelComponent
  ]
})
export class DialogModule { }

export {
  Dialog,
  DialogService,
  DIALOG_TOKEN
} from './dialog.service';