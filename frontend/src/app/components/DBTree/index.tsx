import React, { useEffect } from 'react';
import style from './style.css'
import { DBTreeActions } from 'app/actions';
import { TreeNode } from '../TreeNode';
import { Node } from '../../../../../interfaces';


namespace DBTreeView {
  export interface Props {
      DBTree: Node | null;
      selectedNode: Node | null;
      getDBTree: typeof DBTreeActions.getDBTree;
      selectNode: typeof DBTreeActions.selectNode;
      isFetching: boolean;
  }
}
  
export const DBTreeView = ({ DBTree, selectedNode, getDBTree, selectNode, isFetching }: DBTreeView.Props): JSX.Element | null => {

    useEffect(() => {
      getDBTree()
    }, [])

    return(
        <div className={style.container}>
          { isFetching && <span>Loading</span> }
          { DBTree && <TreeNode
                type='DB'
                level={0}
                indexes={[]} 
                node={DBTree}
                selectNode={selectNode}
                selectedNode={selectedNode}
            />
          }
        </div>
    )
  }
