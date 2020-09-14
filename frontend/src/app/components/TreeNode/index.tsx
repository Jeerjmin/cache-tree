import React, { useState, useEffect } from 'react';
import { CachedTreeActions, DBTreeActions } from 'app/actions';
import style from './style.css'
import { Node } from '../../../../../interfaces';
import classNames from 'classnames/bind'
let cx = classNames.bind(style);

export namespace TreeNode {
    export interface Props {
        type: 'DB' | 'CASH';
        node: Node;
        level: number;
        indexes: number[];
        selectNode: typeof DBTreeActions.selectNode | typeof CachedTreeActions.selectNode;
        selectedNode?: Node | null;
        changeNode?: typeof CachedTreeActions.changeNode;
        changedNode?: Node | null;
        deleteNestedNode?: typeof CachedTreeActions.deleteNestedNode;
        parentDeleted?: boolean;
        addTail?: typeof CachedTreeActions.addTail
    }
}

export const TreeNode = ({
        type, node, level, indexes, selectNode, selectedNode,
        changeNode, changedNode, deleteNestedNode, parentDeleted, addTail
    }: TreeNode.Props): JSX.Element | null => {

    const [value, changeValue] = useState<string>('')

    useEffect(() => {
        if (!node.isDeleted && parentDeleted && deleteNestedNode) {
            deleteNestedNode({ path: { level, indexes }})
        }
    }, [parentDeleted])

    useEffect(() => {
      if (type === 'DB' && node.dbTail === null) {
        if (addTail) {
          addTail({ path: {level, indexes}, id: node.id })
        }
      }
    }, [0])

    const renderValue = () => {

        setTimeout(() => {
            window.onclick = (event: MouseEvent) => {
                const input = document.getElementById('input')

                if (event.target != input && changeNode) {
                    changeNode({ value })
                    window.onclick = null
                    changeValue('')
                }
            }
        }, 0)

        return <input id="input" onChange={event => changeValue(event.target.value)} value={value} />
    }

    let className = cx({
        activeCell: (selectedNode && (selectedNode.id === node.id)),
        cell: !(selectedNode && (selectedNode.id === node.id)),
        deleted: node.isDeleted
        });

    return node ? (
        <div style={{paddingLeft: `${level > 0 ? 30 : 0}px`}}>
            <div
                className={className}
                onClick={() => selectedNode?.id !== node.id ? selectNode({ node, path: { level, indexes } }) : {}}
            >
                {
                    changedNode && (changedNode?.id === node.id)
                    ? renderValue()
                    : <span>{node.value}</span>
                }
            </div>

            {node.childs.map((childNode: Node, i: number) => (
                <React.Fragment key={childNode.id + type + i}>
                    <TreeNode
                        type={type}
                        node={childNode}
                        level={level + 1}
                        indexes = {[...indexes, i]}
                        selectNode={selectNode}
                        selectedNode={selectedNode}
                        changeNode={changeNode}
                        changedNode={changedNode}
                        deleteNestedNode={deleteNestedNode}
                        parentDeleted={node.isDeleted}
                        addTail={addTail}
                    />
                </React.Fragment>
            ))}
        </div>
    ) : null
}
