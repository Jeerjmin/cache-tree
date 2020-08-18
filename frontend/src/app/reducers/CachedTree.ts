import { ReducerFactory } from 'redux-actions-ts-reducer';
import { RootState } from './state';
import { Node, Path } from '../../../../interfaces';
import { CachedTreeActions } from 'app/actions';
import { 
  setWith as lSet, 
  clone as lClone, 
  cloneDeep as lDeepClone, 
  updateWith as lUpdate
} from 'lodash';


const initialState: RootState.CachedTreeState = {
    tree: null,
    dbPath: null,
    selectedNode: null,
    selectedPath: null,
    changedNode: null
};

export const CachedTreeReducer = new ReducerFactory(initialState)
  .addReducer(CachedTreeActions.applyTreeActionSuccess, (state) => {
    return {
        ...state,
        tree: null
    };
  })
  .addReducer(CachedTreeActions.loadNodeAction, (state, action) => {
    if (action.payload) {
      return {
          ...state,
        tree: lDeepClone({ ...action.payload.node, childs: [] }),
        dbPath: { ...action.payload.dbPath }
      };
    }
    return state;
  })
  .addReducer(CachedTreeActions.selectNodeAction, (state, action) => {
    if (action.payload) {
      return {
          ...state,
            selectedNode: { ...action.payload.node },
            selectedPath: {...action.payload.path }
      };
    }
    return state;
  })
  .addReducer(CachedTreeActions.enableChangeModeAction, (state, action) => {
    if (action.payload) {
      return {
          ...state,
            changedNode: { ...action.payload }
      };
    }
    return state;
  })
  .addReducer(CachedTreeActions.changeNodeAction, (state, action) => {
    const { selectedPath, tree } = state

    if (action.payload && tree && selectedPath) {
      
      const { value } = action.payload
      const { level, indexes } = selectedPath

      const path = makePath(level, indexes)

      return {
          ...state,
          tree: lSet(lClone(tree), path, value, lClone),
          changedNode: null,
      };
    }
    return state;
  })
  .addReducer(CachedTreeActions.deleteNodeAction, (state) => {
    if (state.tree && state.selectedPath) {
      let { level, indexes } = state.selectedPath

      let path = makePath(level, indexes, false)

      if (path) {
        path += '.isDeleted'
      } else {
        path += 'isDeleted'
      }

      return {
        ...state,
        tree: lSet(lClone(state.tree), path, true, lClone),
        selectedNode: null,
        selectedPath: null,
        changedNode: null,
      }
    }

    return state
  })
  .addReducer(CachedTreeActions.deleteNestedNodeAction, (state, action) => {
    if (state.tree) {
      let { level, indexes } = action.payload.path

      let path = makePath(level, indexes, false)

      if (path) {
        path += '.isDeleted'
      } else {
        path += 'isDeleted'
      }

      return {
        ...state,
        tree: lSet(lClone(state.tree), path, true, lClone),
        selectedNode: null,
        selectedPath: null,
        changedNode: null,
      }
    }

    return state
  })
  .addReducer(CachedTreeActions.addNodeAction, (state) => {
    const { selectedNode, selectedPath, tree } = state

    if (tree && selectedNode && selectedPath) {
        const { level, indexes } = selectedPath

        const path = makePath(level, indexes, false) + 'childs'

        const childId =  makeId(selectedPath, selectedNode)

        const newTree = lUpdate(lDeepClone(tree), path, function (childs: Node[]) {
          return [...childs, { id: childId, isDeleted: false, value: 'New Node', childs: [] }]
        })
        
        return {
          ...state,
          tree: newTree,
          selectedNode: null,
          changedNode: null
        }
    }
    return state;
  })
  .addReducer(CachedTreeActions.resetAction, (state) => {
    return {
      ...initialState
    }
  })
  .toReducer()

function makePath(level: number, indexes: number[], withValue = true): string {
  let path = ''
  for (let i = 1; i <= level; i++) {
    path += 'childs'
    if (indexes[i-1] !== undefined) {
      path += '[' + indexes[i-1] + ']' + '.'
    }
  }

  if (withValue) {
    path += 'value'
  } else {
    path = path.slice(0, path.length - 1)
  }

  return path
}

function makeId(path: Path, parentNode: Node) {
  const input = [...path.indexes, path.level, parentNode.id, parentNode.childs.length].join()
  var hash = 0, i, chr;
  for (i = 0; i < input.length; i++) {
    chr = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
}