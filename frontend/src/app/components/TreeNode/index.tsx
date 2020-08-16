import React, { useState, useEffect } from 'react';
import style from './style.css'
import { Node } from 'app/reducers/state';

export namespace TreeNode {
    export interface Props {
        type: 'CACHE' | 'DB'
        node: Node;
        getChildNodes: any;
        selectNode: Function;
        changeNode?: Function;
        selectedNode?: Node;
        changedNode?: Node;
    }
  }
  
  export const TreeNode = ({ type, node, getChildNodes, selectNode, changeNode, changedNode, selectedNode }: TreeNode.Props): JSX.Element => {
    

    console.log('update')

    const [selectedNode, selectNode] = useState(null)


    const renderValue = () => {
        if (changedNode?.id === node.id) {
            console.log('renderValue')

            return <input id="input" value={node.value} />
        }
    }

    return (
        <div className={style.container}>
            <div 
                className={
                    (selectedNode && (selectedNode.id === node.id)) 
                    ? style.activeCell 
                    : style.cell
                }
                onClick={() => selectedNode?.id !== node.id ? selectNode(node) : {}}
            >
                { changedNode?.id === node.id ? renderValue() : <span>{node.value}</span> }
            </div>

            {getChildNodes(node).map((childNode: Node, i: number) => (
                <React.Fragment key={i}>
                    <TreeNode
                        type={type}
                        getChildNodes={getChildNodes}
                        node={childNode}
                        selectNode={selectNode}
                        selectedNode={selectedNode}
                        changeNode={changeNode}
                    />
                </React.Fragment>
            ) ) }
        </div>
    )

  }
