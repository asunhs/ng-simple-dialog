import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Inject,
  forwardRef
} from '@angular/core';

import {
  Node,
  TreeComponent
} from '../';

@Component({
  selector: 'dl-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit, OnDestroy {

  @Input() node:Node;

  fold:boolean;
  selected:boolean;

  constructor(
    @Inject(forwardRef(() => TreeComponent)) private tree:TreeComponent
  ) { }

  ngOnInit() {
    console.log("init", this.node.item.id)
    this.tree.select.subscribe(node => {
      this.selected = (node == this.node);
    });
  }

  ngOnDestroy() {
    console.log("destroy", this.node.item.id)
  }

  select() {
    this.tree.select.next(this.node);
  }

  isRoot() {
    return !this.node.parent;
  }

  isLeaf() {
    return this.node.children.length < 1;
  }

  toggle() {
    this.fold = !this.fold;

    if (this.fold && !this.selected && this.tree.isOnSelected(this.node)) {
      this.tree.clear();
    }
  }

}
