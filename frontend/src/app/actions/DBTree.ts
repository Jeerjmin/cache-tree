import { useMemo } from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';
import axios from 'axios';
import { Node, Path } from '../../../../interfaces';

export namespace DBTreeActions {
  export enum Type {
    GET_TREE_DB_REQUEST = 'GET_TREE_DB_REQUEST',
    GET_TREE_DB_SUCESS = 'GET_TREE_DB_SUCCESS',
    GET_TREE_DB_FAILED = 'GET_TREE_DB_FAILED',
    RESET_TREE_REQUEST = 'RESET_TREE_REQUEST',
    RESET_TREE_SUCESS = 'RESET_TREE_SUCCESS',
    RESET_TREE_FAILED = 'RESET_TREE_FAILED',
    SELECT_NODE = 'SELECT_NODE'
  }


  export const getDBTree = () => {
      return (dispatch: Dispatch) => {
        dispatch(getDBTreeRequest())
        axios.get('http://localhost:3000/tree')
            .then(({ data }: { data: Node }) => {
                dispatch(getDBTreeSuccess(data))
            })
            .catch(() => {
              dispatch(getDBTreeFailed())
            })
      }
  }

  export const resetDBTree = () => {
    return (dispatch: Dispatch) => {
      dispatch(resetTreeRequest())
      axios.get('http://localhost:3000/reset')
          .then(({ data }: { data: Node }) => {
              dispatch(resetTreeSuccess(data))
          })
          .catch(() => {
            dispatch(resetTreeFailed())
          })
    }
}

  export const selectNode = (payload: { node: Node, path: Path }) => 
  (dispatch: Dispatch) => dispatch(selectNodeAction(payload))

  export const getDBTreeRequest = createAction(Type.GET_TREE_DB_REQUEST)
  export const getDBTreeSuccess = createAction<Node>(Type.GET_TREE_DB_SUCESS);
  export const getDBTreeFailed = createAction(Type.GET_TREE_DB_FAILED)

  export const resetTreeRequest = createAction(Type.RESET_TREE_REQUEST)
  export const resetTreeSuccess = createAction<Node>(Type.RESET_TREE_SUCESS);
  export const resetTreeFailed = createAction(Type.RESET_TREE_FAILED)


  export const selectNodeAction = createAction<{node: Node, path: Path}>(Type.SELECT_NODE)
}

export type DBTreeActions = Omit<typeof DBTreeActions, 'Type'>;
export const useDBTreeActions = (dispatch: Dispatch) => {
  const { Type, ...actions } = DBTreeActions;
  return useMemo(() => bindActionCreators(actions as any, dispatch), [dispatch]) as DBTreeActions;
};
