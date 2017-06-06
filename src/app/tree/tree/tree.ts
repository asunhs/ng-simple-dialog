import { ID, NodeItem, Node } from '../';

export class Tree {

  constructor(
    public nodes: Map<ID, Node>,
    public root: Node
  ) {}

  update(nodeItems: NodeItem[]) {
    
    let nodes = this.nodes;

    nodeItems.forEach(item => {
      nodes.set(item.id, nodes.get(item.id) || new Node({ item }));
    });

    nodeItems.forEach(item => {
      let self = nodes.get(item.id);
      let parent = nodes.get(item.parentId);

      if (self.parent != parent) {
        if (self.parent) {
          // for move
          self.parent.children.splice(self.parent.children.findIndex(child => child == self), 1);
        }
        
        if (parent) {
          // move or create
          parent.children.push(self);
          self.parent = parent;
        } else {
          // delete
          nodes.delete(item.id);
        }
      }

      self.item = item;
    })
  }

  static build(nodeItems: NodeItem[]): Tree {

    let nodes = new Map<ID, Node>();
    let root: Node;

    nodeItems.forEach(item => {
      nodes.set(item.id, new Node({ item }));
    });

    nodeItems.forEach(item => {
      let parent = nodes.get(item.parentId);
      let self = nodes.get(item.id);

      if (!parent) {
        root = self;
      } else {
        parent.children.push(self);
        self.parent = parent;
      }
    });

    return new Tree(nodes, root);
  }
}