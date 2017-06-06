import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  Tree,
  Node,
  NodeItem,
  NodeComponent
} from '../';

import { Subject } from 'rxjs/Rx';


interface NodeAction {
  type: string;
  node: Node;
  data?: any;
}


@Component({
  selector: 'dl-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  selected: Node[] = [];

  @Input() tree: Tree;
  @Output() select = new EventEmitter<Node>();
  @Output() path = this.select.map(node => this.track(node));

  constructor() {
    this.path.subscribe(path => {
      this.selected = path;
    });
  }
  
  isOnSelected(node: Node) {
    return this.selected.includes(node);
  }

  track(node: Node): Node[] {
    if (node) {
      return [...this.track(node.parent), node];
    }
    return [];
  }

  clear() {
    this.select.next();
  }

  ngOnInit() { }
}
