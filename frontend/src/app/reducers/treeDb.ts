import { handleActions } from 'redux-actions';
import { RootState, Node } from 'app/reducers/state';
import { TreeDbActions } from 'app/actions';

const initialState: RootState.TreeDbState = {
    tree: {
        id: 1,
        value: 1,
        childs: []
    },
    selectedNode: undefined,
};

export const treeDbReducer = handleActions<RootState.TreeDbState, Node>(
  {
    [TreeDbActions.Type.GET_TREE_DB]: (state, action) => {
      if (action.payload) {
        return {
            ...state,
            tree: { ...action.payload }
        };
      }
      return state;
    },
    [TreeDbActions.Type.SELECT_NODE]: (state, action) => {
        if (action.payload) {
          return {
              ...state,
                selectedNode: { ...action.payload }
          };
        }
        return state;
      },
  },
  initialState
);
