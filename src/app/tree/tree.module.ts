import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeComponent } from './node/node.component';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NodeComponent,
    TreeComponent
  ],
  exports: [
    TreeComponent
  ]
})
export class TreeModule { }
