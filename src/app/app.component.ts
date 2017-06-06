import { Component } from '@angular/core';

import { DialogService } from './dialog';

import { TestComponent } from './test/test.component';

import { Tree } from './tree';


@Component({
  selector: 'dl-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'dl works!';

  tree = Tree.build([{
    id: 1,
    type: "A",
    parentId: 5
  },{
    id: 2,
    type: "B",
    parentId: 5
  },{
    id: 3,
    type: "C",
    parentId: 1
  },{
    id: 5,
    type: "E"
  },{
    id: 6,
    type: "F",
    parentId: 2
  },{
    id: 7,
    type: "G",
    parentId: 2
  },{
    id: 8,
    type: "H",
    parentId: 1
  }])

  constructor(
    private dialogSvc:DialogService
  ) {}

  onSelect(node) {
    console.log(node);
  }

  update() {
    this.tree.update([{
      id: 3,
      type: "C",
      parentId: 2
    },{
      id: 4,
      type: "D",
      parentId: 1
    },{
      id: 8,
      type: "H"
    }]);
  }

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
