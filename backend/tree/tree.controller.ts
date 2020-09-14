import { Request, Response } from 'express';
import { updateWith as lUpdate, unionBy as lUnion } from 'lodash'
import { TreeFactory} from './index'
import {Node} from '../../interfaces'

export const getTree = (req: Request, res: Response) => {
    res.status(200).json((global as any).tree)
}

export const applyTree = (req: Request, res: Response) => {
    let { tree } = global as any

    let { trees: cacheTree } = req.body

    function makePath(level: number, indexes: number[]): any {
        let path = ''

        for (let i = 0; i < level; i++) {
            path += 'childs'
            if (indexes[i] !== undefined) {
                path += '[' + indexes[i] + ']' + '.'
            }
        }

        return path.substring(0, path.length-1)
    }

    function setIsDeleted (node: Node) {
        const n = node;
        node.isDeleted = true;
        if (n.childs && n.childs.length > 0) {
            n.childs.forEach((v: Node) => {
                setIsDeleted(v);
            });
        }
        return n;
    }

    function insertNode(node: Node) {
        if (!node) return
        if (!node.dbTail) return;

        const { dbTail: { level, indexes } } = node
        let path = makePath(level, indexes)

        if (path) {
            lUpdate(tree, path, function (updatedNode: Node) {
                const unionChilds = lUnion(updatedNode.childs, node.childs.filter(n => n.dbTail === undefined), 'id')

                return {
                    ...updatedNode,
                    value: node.value,
                    isDeleted: node.isDeleted,
                    childs: unionChilds
                }
            })
        } else {
            tree = {
                ...tree,
                value: node.value,
                isDeleted: node.isDeleted,
                childs: [
                    ...tree.childs,
                    ...node.childs.filter(n => n.dbTail === undefined)
                ]
            }

            if (node.isDeleted) {
                setIsDeleted(tree)
            }
        }

        for (let i = 0; i < node.childs.length; i++) {
            insertNode(node.childs[i])
        }
    }





    cacheTree.forEach((treeEl: Node) => insertNode(treeEl))





    res.status(200).json(tree)
}

export const resetTree = (req: Request, res: Response) => {
    (global as any).tree = new TreeFactory().init();

    res.status(200).json((global as any).tree)
}