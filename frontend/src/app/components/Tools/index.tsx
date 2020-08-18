import React from 'react';
import style from './style.css'
import { Node } from '../../../../../interfaces';
import { CachedTreeActions, DBTreeActions } from 'app/actions';

export namespace Tools {
    export interface Props {
      deleteNode: typeof CachedTreeActions.deleteNode
      addNode: typeof CachedTreeActions.addNode
      enableChangeMode: typeof CachedTreeActions.enableChangeMode
      applyTree: typeof CachedTreeActions.applyTree
      resetCache: typeof CachedTreeActions.resetCache
      resetDBTree: typeof DBTreeActions.resetDBTree
      selectedNode: Node | null
    }
  }
  
  export const Tools = ({ 
    addNode, deleteNode, enableChangeMode, applyTree, 
    resetCache, resetDBTree, selectedNode 
  }: Tools.Props): JSX.Element => {
    
    const handleReset = () => {
      resetCache()
      resetDBTree()
    }
    
    return (
        <div className={style.container}>
            <button disabled={selectedNode?.isDeleted} onClick={() => addNode()}> + </button>
            <button disabled={selectedNode?.isDeleted} onClick={() => deleteNode()}> - </button>
            <button disabled={selectedNode?.isDeleted} onClick={() => enableChangeMode()}> a </button>
            <button onClick={() => applyTree()}> Apply</button>
            <button onClick={handleReset}> Reset </button>
        </div>
    )
  }
