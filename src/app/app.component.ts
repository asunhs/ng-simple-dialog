import { Component } from '@angular/core';

import { DialogService } from './dialog';

import { TestComponent } from './test/test.component';

@Component({
  selector: 'dl-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'dl works!';

  constructor(
    private dialogSvc:DialogService
  ) {}

  open() {
    this.dialogSvc.open({
      component: TestComponent,
      preclosing: value => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (value) {
              resolve(!value);
            } else {
              reject(!value);
            }
          }, 1000);
        });
      },
      data: {
        title: "Sun",
        closing: msg => {
          console.log(msg);
        }
      }
    }).afterClose.subscribe(value => {
      console.log("value", value);
    }, () => {}, () => console.log("closed"));



    setTimeout(() => {
      this.dialogSvc.closeAll().then(() => {
        console.log("Good");
      }, () => {
        console.log("Bad");
      });
    }, 4000);
  }
}
