import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';
import { RootState } from 'app/reducers/state'
import { Node, Path } from '../../../../interfaces';
import axios from 'axios'

export namespace CachedTreeActions {
  export enum Type {
    LOAD_NODE = 'LOAD_CACHE_NODE',
    ADD_NODE = 'ADD_CACHE_NODE',
    SELECT_NODE = 'SELECT_CACHE_NODE',
    DELETE_NODE = 'DELETE_CACHE_NODE',
    DELETE_NESTED_NODE = 'DELETE_CACHE_NESTED_NODE',
    ENABLE_CHANGE_MODE = 'ENABLE_CHANGE_MODE',
    CHANGE_NODE = 'CHANGE_CACHE_NODE',
    APPLY_TREE_REQUEST = 'APPLY_TREE_REQUEST',
    APPLY_TREE_SUCCESS = 'APPLY_TREE_SUCCESS',
    APPLY_TREE_FAILED = 'APPLY_TREE_FAILED',
    RESET = 'RESET',
    MAKE_TAILS = 'MAKE_TAILS',
    GET_NODE_REQUEST = 'GET_NODE_REQUEST',
    GET_NODE_SUCCESS = 'GET_NODE_SUCCESS',
    GET_NODE_FAILED = 'GET_NODE_FAILED'
  }


  export const loadNode = () => {
    return (dispatch: Dispatch, getStore: () => RootState) => {
      const { DBTree: { selectedPath, selectedNode } } = getStore()

      if (selectedNode && selectedPath) {
        dispatch(loadNodeAction({ node: selectedNode, dbTail: selectedPath }))
      }
    }
  }

  export const getNode = () => {
    return (dispatch: Dispatch, getStore: () => RootState) => {
      const { DBTree: { selectedNode } } = getStore()

      if (selectedNode) {
        dispatch(getNodeRequest())
        const params = {
          index: selectedNode.index,
          parentId: selectedNode.parentId,
        };
        axios.get(`http://localhost:3000/node`, { params })
          .then(({ data }: { data: Node }) => {
            dispatch(getNodeSuccess(data))
          })
          .catch(() => {
            dispatch(getNodeFailed())
          })
      }
    }
  }

  export const applyTree = () => {
    return (dispatch: Dispatch, getStore: () => RootState) => {
      dispatch(applyTreeActionRequest())
      const {CachedTree} = getStore()

      axios.post('http://localhost:3000/tree', {
        trees: CachedTree.trees,
      })
      .then(({ data }: { data: Node }) => {
          dispatch(applyTreeActionSuccess(data))
      })
      .catch(() => dispatch(applyTreeActionFailed()))
    }
  }


  export const addNode = () => {
    return (dispatch: Dispatch, getStore: () => RootState) => {
      const {CachedTree: { selectedNode }} = getStore()

      if (selectedNode) {
        dispatch(addNodeAction(selectedNode))
      }
    }
  }


  export const selectNode = (payload: { node: Node, path: Path }) =>
    (dispatch: Dispatch) => dispatch(selectNodeAction(payload))

  export const deleteNode = () => (dispatch: Dispatch) => dispatch(deleteNodeAction())

  export const deleteNestedNode = (payload: { path: Path}) =>
  (dispatch: Dispatch) => dispatch(deleteNestedNodeAction(payload))

  export const enableChangeMode = () => {
    return (dispatch: Dispatch, getStore: () => RootState) => {
      const {CachedTree: { selectedNode }} = getStore()

      if (selectedNode) {
        dispatch(enableChangeModeAction(selectedNode))
      }
    }
  }

  export const resetCache = () =>(dispatch: Dispatch) => dispatch(resetAction())

  export const changeNode = (payload: { value: string }) =>
    (dispatch: Dispatch) => dispatch(changeNodeAction(payload))


  export const addTail = (payload: { path: Path, id: number }) =>
    (dispatch: Dispatch) => dispatch(makeTails(payload))

    export const changeNodeAction = createAction< {value: string} >(Type.CHANGE_NODE)
    export const enableChangeModeAction = createAction<Node>(Type.ENABLE_CHANGE_MODE)
    export const deleteNodeAction = createAction(Type.DELETE_NODE)
    export const deleteNestedNodeAction = createAction<{ path: Path }>(Type.DELETE_NESTED_NODE)
    export const selectNodeAction = createAction<{ node: Node, path: Path }>(Type.SELECT_NODE)
    export const addNodeAction = createAction<Node>(Type.ADD_NODE)
    export const applyTreeActionRequest = createAction(Type.APPLY_TREE_REQUEST)
    export const applyTreeActionSuccess = createAction<Node>(Type.APPLY_TREE_SUCCESS)
    export const applyTreeActionFailed = createAction(Type.APPLY_TREE_FAILED)
    export const loadNodeAction = createAction<{ dbTail: Path, node: Node }>(Type.LOAD_NODE)
    export const resetAction = createAction(Type.RESET)
    export const makeTails = createAction<{ path: Path, id: number }>(Type.MAKE_TAILS)

    export const getNodeRequest = createAction(Type.GET_NODE_REQUEST)
    export const getNodeSuccess = createAction<Node>(Type.GET_NODE_SUCCESS)
    export const getNodeFailed = createAction(Type.GET_NODE_FAILED)
  }


export type CachedTreeActions = Omit<typeof CachedTreeActions, 'Type'>;
export const useCachedTreeActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = CachedTreeActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as CachedTreeActions;
};
