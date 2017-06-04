import { Component, Input, Output, Inject, OnInit, OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Dialog, DIALOG_TOKEN } from '../dialog';



@Component({
  selector: 'dl-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnDestroy {

  @Input("title") data: any;
  @Output() closing: EventEmitter<string> = new EventEmitter();

  constructor(
    @Inject(DIALOG_TOKEN) private dialog: Dialog
  ) {
    console.log("c", this.data);
  }

  ngOnInit() {
    console.log("i", this.data);
  }

  ngOnDestroy() {
    this.closing.next("I'm Closing");
    console.log("Destroy");
  }

  closeThis() {
    this.dialog.close(true).subscribe(result => {
      console.log('closeThis', result);
    });
  }

}
