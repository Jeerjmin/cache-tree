import { Node, Path } from '../../../../interfaces';

export interface RootState {
  DBTree: RootState.DBTreeState;
  CachedTree: RootState.CachedTreeState;
}

export namespace RootState {

  export interface DBTreeState {
    tree: Node | null;
    selectedNode: Node | null
    selectedPath: Path | null
    isFetching: boolean
  }

  export interface CachedTreeState {
    trees: Node[];
    selectedNode: Node | null,
    selectedPath: Path | null
    changedNode: Node | null
  }

}
