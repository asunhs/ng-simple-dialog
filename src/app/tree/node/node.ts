export declare type ID = string | number;

export interface NodeItem {
  id: ID;
  type: string;
  parentId?: ID;
}


export interface NodeType {
  item: NodeItem;
  parent?: Node;
  children?: Node[];
}


export class Node implements NodeType {

  item: NodeItem;
  parent: Node;
  children: Node[];

  constructor(node?: NodeType) {
    this.item = node.item;
    this.parent = node.parent;
    this.children = node.children || [];
  }
}