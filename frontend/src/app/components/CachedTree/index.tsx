import React from 'react';
import style from './style.css'
import { CachedTreeActions } from 'app/actions';
import { TreeNode } from '../TreeNode';
import { Node } from '../../../../../interfaces';

namespace CachedTreeView {
    export interface Props {
        CachedTree: Node | null;
        selectedNode: Node | null;
        selectNode: typeof CachedTreeActions.selectNode;
        changeNode: typeof CachedTreeActions.changeNode;
        changedNode: Node | null;
        deleteNestedNode: typeof CachedTreeActions.deleteNestedNode;
    }
}
  
export const CachedTreeView = ({ CachedTree, selectedNode, selectNode, changeNode, changedNode, deleteNestedNode }: CachedTreeView.Props): JSX.Element => {

    return (
        <div className={style.container}>
            {CachedTree && <TreeNode
                type='CASH'
                level={0}
                indexes={[]}  
                node={CachedTree}
                selectNode={selectNode}
                changeNode={changeNode}
                selectedNode={selectedNode}
                changedNode={changedNode}
                deleteNestedNode={deleteNestedNode}
            /> }
        </div>
    )
}
