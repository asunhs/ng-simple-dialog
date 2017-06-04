import { Component } from '@angular/core';

import { DialogService } from '../dialog.service';

@Component({
  selector: 'dl-dialog-panel',
  templateUrl: './dialog-panel.component.html',
  styleUrls: ['./dialog-panel.component.scss']
})
export class DialogPanelComponent {

  dialogs;

  constructor(dialogSvc: DialogService) {
    this.dialogs = dialogSvc.dialogs;
  }
}
