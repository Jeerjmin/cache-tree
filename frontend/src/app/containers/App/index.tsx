import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/reducers';
import { useDBTreeActions, useCachedTreeActions } from 'app/actions';
import { DBTreeView } from 'app/components/DBTree';
import { CachedTreeView } from 'app/components/CachedTree';
import { Tools } from 'app/components/Tools';
import style from './style.css';


export const App = () => {

    const dispatch = useDispatch();
    const { tree, selectedNode, CachedTrees, changedNode, selectedCacheNode, isFetching } = useSelector((state: RootState) => {
        return {
            ...state.DBTree,
            CachedTrees: state.CachedTree.trees,
            selectedCacheNode: state.CachedTree.selectedNode,
            changedNode: state.CachedTree.changedNode
        }
    })
    const DBTreeActions = useDBTreeActions(dispatch);
    const CachedTreeActions = useCachedTreeActions(dispatch)

    return (
        <div className={style.container}>
            <div className={style.box}>
                <div className={style.top}>
                    <CachedTreeView
                        CachedTrees={CachedTrees}
                        selectNode={CachedTreeActions.selectNode}
                        selectedNode={selectedCacheNode}
                        changedNode={changedNode}
                        changeNode={CachedTreeActions.changeNode}
                        deleteNestedNode={CachedTreeActions.deleteNestedNode}
                    />
                    <span onClick={CachedTreeActions.loadNode}>Arrow</span>
                    <DBTreeView
                        isFetching={isFetching}
                        DBTree={tree}
                        getDBTree={DBTreeActions.getDBTree}
                        selectNode={DBTreeActions.selectNode}
                        selectedNode={selectedNode}
                        addTail={CachedTreeActions.addTail}
                    />
                </div>
                <div className={style.bottom}>
                    <Tools
                        deleteNode={CachedTreeActions.deleteNode}
                        addNode={CachedTreeActions.addNode}
                        enableChangeMode={CachedTreeActions.enableChangeMode}
                        applyTree={CachedTreeActions.applyTree}
                        selectedNode={selectedCacheNode}
                        resetCache={CachedTreeActions.resetCache}
                        resetDBTree={DBTreeActions.resetDBTree}
                    />
                </div>
            </div>
        </div>
    )
}
