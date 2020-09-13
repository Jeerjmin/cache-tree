import React from 'react';
import style from './style.css'
import { CachedTreeActions } from 'app/actions';
import { TreeNode } from '../TreeNode';
import { Node, Path } from '../../../../../interfaces';

namespace CachedTreeView {
    export interface Props {
        CachedTrees: Node[];
        selectedNode: Node | null;
        selectNode: typeof CachedTreeActions.selectNode;
        changeNode: typeof CachedTreeActions.changeNode;
        changedNode: Node | null;
        deleteNestedNode: typeof CachedTreeActions.deleteNestedNode;
    }
}

export const CachedTreeView = ({ CachedTrees, selectedNode, selectNode, changeNode, changedNode, deleteNestedNode }: CachedTreeView.Props): JSX.Element => {

    return (
        <div className={style.container}>
          {CachedTrees.map((childNode, i) =>
            <TreeNode
              key={i}
              type='CASH'
              level={0}
              indexes={[i]}
              node={childNode}
              selectNode={selectNode}
              changeNode={changeNode}
              selectedNode={selectedNode}
              changedNode={changedNode}
              deleteNestedNode={deleteNestedNode}
            />
          )}
        </div>
    )
}
