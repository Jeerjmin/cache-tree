import { handleActions } from 'redux-actions';
import { RootState, Node } from './state';
import { TreeCacheActions } from 'app/actions';

const initialState: RootState.TreeCacheState = {
    tree: {
        id: 1,
        value: 1,
        childs: []
    },
    selectedNode: undefined,
    changedNode: undefined
};

// TODO remove any
export const treeCacheReducer = handleActions<RootState.TreeCacheState, any>(
  {
    [TreeCacheActions.Type.LOAD_NODE]: (state, action) => {
      if (action.payload) {
        return {
            ...state,
          tree: { ...action.payload, childs: [] }
        };
      }
      return state;
    },
    [TreeCacheActions.Type.SELECT_NODE]: (state, action) => {
        if (action.payload) {
          return {
              ...state,
                selectedNode: { ...action.payload }
          };
        }
        return state;
    },
    [TreeCacheActions.Type.ENABLE_CHANGE_MODE]: (state, action) => {
        if (action.payload) {
          return {
              ...state,
                changedNode: { ...action.payload }
          };
        }
        return state;
    },
    [TreeCacheActions.Type.DELETE_NODE]: (state, { payload }) => {
        if (payload) {

            const findedNode = findNode(state.tree, payload)

            console.log('findedNode', findedNode)
            return state
        }
        return state;
    },
  },
  initialState
);


function findNode(node: Node, id: number) {
    if (node == null) return node
    if (node.id === id) return node

    node.childs.forEach((child: Node) => {
        let foundedNode = findNode(child, id)
        if (foundedNode) return foundedNode
    })

    return null
}