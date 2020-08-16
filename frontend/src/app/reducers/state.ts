import { TreeNodeModel } from 'app/models';

export interface RootState {
  treeDb: RootState.TreeDbState;
  treeCache: RootState.TreeCacheState;
  router?: any;
}

export type Node = TreeNodeModel;


export namespace RootState {
  export interface TreeDbState {
    tree: Node;
    selectedNode: Node | undefined
  }
  export interface TreeCacheState {
    tree: Node;
    selectedNode: Node | undefined
    changedNode: Node | undefined
  }
}
