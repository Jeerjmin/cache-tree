import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';
import axios from 'axios';
import { Node } from 'app/reducers/state'

export namespace TreeDbActions {
  export enum Type {
    GET_TREE_DB = 'GET_TREE_DB',
    SAVE_TREE_DB = 'SAVE_TREE_DB',
    SELECT_NODE = 'SELECT_NODE'
  }


  // TODO Add full-cycle actions - Request/Success/Failed
  export const getTreeDb = () => {
      return (dispatch: Dispatch) => {
        axios.get('http://localhost:3000/tree')
            .then((res: any) => {
                dispatch(getTreeDbSuccess(res.data))
            })
      }
  }

  export const selectNode = (node: Node) => 
  (dispatch: Dispatch) => dispatch(selectNodeSuccess(node))

  export const getTreeDbSuccess = createAction(Type.GET_TREE_DB);
  export const saveTreeDbSuccess = createAction(Type.SAVE_TREE_DB);
  export const selectNodeSuccess = createAction(Type.SELECT_NODE)
}

export type TreeDbActions = Omit<typeof TreeDbActions, 'Type'>;
export const useTreeDbActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = TreeDbActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as TreeDbActions;
};
