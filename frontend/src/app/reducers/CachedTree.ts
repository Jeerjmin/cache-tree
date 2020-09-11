import { ReducerFactory } from 'redux-actions-ts-reducer';
import { RootState } from './state';
import { Node, Path } from '../../../../interfaces';
import { CachedTreeActions } from 'app/actions';
import {
  setWith as lSet,
  clone as lClone,
  cloneDeep as lDeepClone,
  updateWith as lUpdate,
  get as lGet
} from 'lodash';


const initialState: RootState.CachedTreeState = {
    trees: [],
    tree: null,
    dbPath: [],
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
      const node = withoutChild(action.payload.node)
      const { dbPath } = action.payload
      const trees = state.trees
      let newTrees = [...trees]

      if (trees.length === 0) {
        newTrees = [node]
      } else
        if (!findNode(newTrees, node)) {
          const isChildInserted = { success: false }
          const isP1Inserted = { success: false }
          let P2;

          insertParent(newTrees, node, isP1Inserted)

          if (isP1Inserted.success) {
            for (let i = 0; i<newTrees.length; i++) {
              P2 = haveParent(newTrees, newTrees[i])

              if (P2) {
                P2.childs.push(newTrees[i])
                newTrees.splice(i, 1)
                i--
              }
            }
          }

          if (!isP1Inserted.success && !P2) {
            insertChildren(newTrees, node, isChildInserted)

            if (!isChildInserted.success) {
              newTrees = [...newTrees, node]
            }
          }
        }

        const newDbPath = newTrees.map((node:Node) => {
          const find = state.dbPath.find((el: any) => el.id === node.id)
          if (find) {
            return {
              ...find
            }
          }
          return {...dbPath, id: node.id}
        })


      return {
          ...state,
        trees: newTrees,
        dbPath: newDbPath
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
    const { selectedPath, trees } = state

    if (action.payload && selectedPath) {
      const newTrees = [...trees];
      const { value } = action.payload
      const { level, indexes } = selectedPath

      const { firstIndex, path } = makePath(level, indexes)

      const tree = newTrees[firstIndex]
      const newTree = lSet(lClone(tree), path, value, lClone)
      console.log('newTree', newTree, path)
      newTrees[firstIndex] = newTree

      return {
          ...state,
        trees: newTrees,
        changedNode: null,
      };
    }
    return state;
  })
  .addReducer(CachedTreeActions.deleteNodeAction, (state) => {
    if (state.selectedPath) {
      const newTrees = [...state.trees];

      let { level, indexes } = state.selectedPath

      let { firstIndex, path } = makePath(level, indexes, false)

      const tree = newTrees[firstIndex]

      path += 'isDeleted'


      const newTree = lSet(lClone(tree), path, true, lClone)
      console.log('delete', path, newTree)

      newTrees[firstIndex] = newTree

      return {
        ...state,
        trees: newTrees,
        selectedNode: null,
        selectedPath: null,
        changedNode: null,
      }
    }

    return state
  })
  .addReducer(CachedTreeActions.deleteNestedNodeAction, (state, action) => {
      const newTrees = [...state.trees];

      let { level, indexes } = action.payload.path

      let { firstIndex, path } = makePath(level, indexes, false)

      const tree = newTrees[firstIndex]

      path += 'isDeleted'


      const newTree = lSet(lClone(tree), path, true, lClone)
      console.log('delete', path, newTree)

      newTrees[firstIndex] = newTree

      return {
        ...state,
        trees: newTrees,
        selectedNode: null,
        selectedPath: null,
        changedNode: null,
      }

  })
  .addReducer(CachedTreeActions.addNodeAction, (state) => {
    const { selectedNode, selectedPath, trees } = state

    if (selectedNode && selectedPath) {
      const newTrees = [...trees];
      const { level, indexes } = selectedPath

      let { firstIndex, path } = makePath(level, indexes, false)
      path += 'childs'
      const childId =  makeId(selectedPath, selectedNode)

      const tree = newTrees[firstIndex]
      console.log('add', tree)

      const newTree = lUpdate(lDeepClone(tree), path, function (childs: Node[]) {
        return [...childs, { id: childId, isDeleted: false, value: 'New Node', childs: [] }]
      })

      newTrees[firstIndex] = newTree

      return {
        ...state,
        trees: newTrees,
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

function makePath(level: number, indexes: number[], withValue = true): any {
  let path = ''
  console.log(' makePath', level, indexes)

  for (let i = 1; i <= level; i++) {
    path += 'childs'
    if (indexes[i] !== undefined) {
      path += '[' + indexes[i] + ']' + '.'
    }
  }

  if (withValue) {
    path += 'value'
  }

  console.log('return makePath', {firstIndex: indexes[0], path })

  return { firstIndex: indexes[0], path }
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


function isChild(root: Node, node: Node): boolean {
  return root.childs.some((child: Node) => child.id === node.id)
}

function isParent(root:Node, node: Node): boolean {
  return node.childs.some((child: Node) => child.id === root.id)
}

function insertParent(childs: Node[], node: Node, F: { success: boolean }, withSplice = false): Node | undefined {
  if (!childs) return

  for (let i = 0; i < childs.length; i++) {
   if (childs[i].id === node.parentId) {
     childs[i].childs.push(node)
     F.success = true

     if (withSplice) {
       childs.splice(i, 1)
       i--
     }
   }
    insertParent(childs[i].childs, node, F)
  }
}

function haveParent(childs: Node[], node: Node): Node | undefined {
  if (!childs) return

  for (let i = 0; i < childs.length; i++) {
    if (childs[i].id === node.parentId) {
      return childs[i]
    }

    const r = haveParent(childs[i].childs, node)
    if (r) {
      return r
    }
  }
}



function insertChildren (childs: Node[], node: Node, F: { success: boolean })  {
  if (!childs) return
  console.log('insertChildren')
  for (let i = 0; i < childs.length; i++) {
    if (childs[i].parentId === node.id) {
      childs[i] = {...node, childs: [...childs.filter(c => c.parentId === node.id)]}

      mutationFilter(childs, (c: Node) => {
        console.log('filter i', c, node, childs[i], i)
        return c.parentId !== node.id
      })
      F.success = true
      return
    }
    insertChildren(childs[i].childs, node, F)
  }
}

function findNode(childs: Node[], node: Node): Node | undefined {
  if (!childs || childs.length === 0) return

  const findedNode = childs.find((childNode) => childNode.id === node.id)

  if (findedNode) {
    return findedNode
  }

  for (let i = 0; i < childs.length; i++) {
    const r = findNode(childs[i].childs, node)

    if (r) {
      return r
    }
  }
}

function isNewChild(childs: Node[], node: Node): boolean {
  return childs.length === 0 || !childs.some(c => c.id === node.id)
}


function withoutChild(node: Node): Node {
  return {...node, childs: []}
}




function recInsertChild(elTree: Node, dbNode: Node, node: Node): any {
  if (!elTree || !dbNode) return false

  for (let i = 0; i < dbNode.childs.length; i++) {
    console.log('loop', dbNode.childs[i], node, i)
    const r = recInsertChild(elTree.childs[i], dbNode.childs[i], node)

    if (r) {
      return r
    }

    const isChildNode = isChild(dbNode.childs[i], node)
    // console.log('isChildNode', isChildNode, dbNode.childs[i], node, i)
    // console.log('elTree', elTree)
    if (isChildNode) {
      const tree = elTree.childs.find((n) => n.id === dbNode.childs[i].id)
      if (tree) {
        tree.childs.push(withoutChild(node))
        return true
      }
    }
  }

}


function mutationFilter(arr: any[], cb: Function) {
  for (let l = arr.length - 1; l >= 0; l -= 1) {
    if (!cb(arr[l])) arr.splice(l, 1);
  }
}
