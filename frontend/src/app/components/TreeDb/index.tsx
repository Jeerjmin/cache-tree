import React, { useEffect } from 'react';
import style from './style.css'
import { TreeDbActions } from 'app/actions';
import { TreeNode } from '../TreeNode';
import { Node } from 'app/reducers/state';


export namespace TreeDb {
    export interface Props {
        treeDb: Node;
        selectedNode?: Node;
        getTreeDb: typeof TreeDbActions.getTreeDb;
        selectNode: typeof TreeDbActions.selectNode;
    }
  }
  
export const TreeDb = ({ treeDb, selectedNode, getTreeDb, selectNode }: TreeDb.Props): JSX.Element => {

    useEffect(() => {
      getTreeDb()
    }, [])

    const getChildNodes = (node: Node) => {
       if (!node.childs) return []
       return node.childs.map(child => child)
    }

    return (
        <div className={style.container}>
            <TreeNode 
                type='DB'
                node={treeDb}
                getChildNodes={getChildNodes}
                selectNode={selectNode}
                selectedNode={selectedNode}
            />
        </div>
    )
  }
