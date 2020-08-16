import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';
import { Node } from 'app/reducers/state'

export namespace TreeCacheActions {
  export enum Type {
    LOAD_NODE = 'LOAD_CACHE_NODE',
    ADD_NODE = 'ADD_CACHE_NODE',
    SELECT_NODE = 'SELECT_CACHE_NODE',
    DELETE_NODE = 'DELETE_CACHE_NODE',
    ENABLE_CHANGE_MODE = 'ENABLE_CHANGE_MODE',
    CHANGE_NODE = 'CHANGE_CACHE_NODE',
  }


  // TODO Add full-cycle actions - Request/Success/Failed
  // TODO remove any
  export const loadNode = (node: any) => {
      return (dispatch: Dispatch) => {
            dispatch(createAction(Type.LOAD_NODE)(node))
      }
  }

  export const addNode = (parentNode: Node | undefined) =>
    (dispatch: Dispatch) => dispatch(createAction(Type.ADD_NODE)(parentNode))

  export const selectNode = (node: Node) => 
    (dispatch: Dispatch) => dispatch(createAction(Type.SELECT_NODE)(node))

  export const deleteNode = (index: number | undefined) =>
    (dispatch: Dispatch) => dispatch(createAction(Type.DELETE_NODE)(index))

  export const enableChangeMode = (node: Node |  undefined) =>
    (dispatch: Dispatch) => dispatch(createAction(Type.ENABLE_CHANGE_MODE)(node))

  export const changeNode = (index: number, value: string) =>
    (dispatch: Dispatch) => dispatch(createAction(Type.CHANGE_NODE)(index, value))

}

export type TreeCacheActions = Omit<typeof TreeCacheActions, 'Type'>;
export const useTreeCacheActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = TreeCacheActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as TreeCacheActions;
};
