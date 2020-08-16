import React from 'react';
import style from './style.css'
import { TreeCacheActions } from 'app/actions';
import { TreeNode } from '../TreeNode';
import { Node } from 'app/reducers/state';


export namespace TreeCache {
    export interface Props {
        tree: Node;
        selectedNode?: Node;
        selectNode: typeof TreeCacheActions.selectNode;
        changeNode: typeof TreeCacheActions.changeNode;
        changedNode?: Node;
    }
  }
  
export const TreeCache = ({ tree, selectedNode, selectNode, changeNode, changedNode }: TreeCache.Props): JSX.Element => {

    const getChildNodes = (node: Node) => {
       if (!node.childs) return []
       return node.childs.map(child => child)
    }

    return (
        <div className={style.container}>
            <TreeNode 
                type='CACHE'
                node={tree}
                getChildNodes={getChildNodes}
                selectNode={selectNode}
                changeNode={changeNode}
                selectedNode={selectedNode}
                changedNode={changedNode}
            />
        </div>
    )
  }
