import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/reducers';
import { useTreeDbActions, useTreeCacheActions } from 'app/actions';
import { TreeCache } from 'app/components/TreeCache';
import { TreeDb } from 'app/components/TreeDb';
import { Tools } from 'app/components/Tools';
import style from './style.css';

export namespace App {
    export interface Props extends RouteComponentProps<void> {}
  }

export const App = ({ history, location }: App.Props) => {

    const dispatch = useDispatch();
    const { tree, selectedNode, treeCache, changedNode, selectedCacheNode } = useSelector((state: RootState) => {
        return {
            ...state.treeDb,
            treeCache: state.treeCache.tree,
            selectedCacheNode: state.treeCache.selectedNode,
            changedNode: state.treeCache.changedNode
        }
    })
    const treeDbActions = useTreeDbActions(dispatch);
    const treeCacheActions = useTreeCacheActions(dispatch)

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.top}>
                    <TreeCache 
                        tree={treeCache} 
                        selectNode={treeCacheActions.selectNode}
                        selectedNode={selectedCacheNode} 
                        changedNode={changedNode}
                        changeNode={treeCacheActions.changeNode}
                    />
                    <span onClick={() => treeCacheActions.loadNode(selectedNode)}>Arrow</span>
                    <TreeDb 
                        treeDb={tree} 
                        getTreeDb={treeDbActions.getTreeDb}
                        selectNode={treeDbActions.selectNode}
                        selectedNode={selectedNode} 
                    />
                </div>
                <div className={style.bottom}>
                    <Tools 
                        deleteNode={() => treeCacheActions.deleteNode(selectedCacheNode?.id)}
                        addNode={() => treeCacheActions.addNode(selectedCacheNode)}
                        enableChangeMode={() => treeCacheActions.enableChangeMode(selectedCacheNode)}
                    />
                </div>
            </div>
        </div>
    )
}