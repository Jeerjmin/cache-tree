import { Request, Response } from 'express';
import { updateWith as lUpdate, unionBy as lUnion } from 'lodash'
import { TreeFactory} from './index'
import {Node} from '../../interfaces'

export const getTree = (req: Request, res: Response) => {
    res.status(200).json((global as any).tree)
}

export const getNode = (req: Request, res: Response) => {
    const { tree } = global as any
    const { index, parentId } = req.query

    const node = findNode(tree, Number(index), Number(parentId))
    const nodeWithoutChilds = { ...node, childs: [] }

    res.status(200).json(nodeWithoutChilds)
}

export const applyTree = (req: Request, res: Response) => {
    let { tree } = global as any

    let { trees: cacheTree } = req.body
    //
    // function makePath(level: number, indexes: number[]): any {
    //     let path = ''
    //
    //     for (let i = 0; i < level; i++) {
    //         path += 'childs'
    //         if (indexes[i] !== undefined) {
    //             path += '[' + indexes[i] + ']' + '.'
    //         }
    //     }
    //
    //     return path.substring(0, path.length-1)
    // }
    //
    // function setIsDeleted (node: Node) {
    //     const n = node;
    //     node.isDeleted = true;
    //     if (n.childs && n.childs.length > 0) {
    //         n.childs.forEach((v: Node) => {
    //             setIsDeleted(v);
    //         });
    //     }
    //     return n;
    // }
    //
    // function insertNode(node: Node) {
    //     if (!node) return
    //
    //     const { level, parentId } = node
    //     let path = makePath(level, indexes)
    //
    //     if (path) {
    //         lUpdate(tree, path, function (updatedNode: Node) {
    //             const unionChilds = lUnion(updatedNode.childs, node.childs.filter(n => n.dbTail === null), 'id')
    //
    //             if (node.isDeleted) {
    //                 unionChilds.forEach(c => setIsDeleted(c))
    //             }
    //
    //             return {
    //                 ...updatedNode,
    //                 value: node.value,
    //                 isDeleted: node.isDeleted,
    //                 childs: unionChilds
    //             }
    //
    //         })
    //     } else {
    //         tree = {
    //             ...tree,
    //             value: node.value,
    //             isDeleted: node.isDeleted,
    //             childs: [
    //                 ...tree.childs,
    //                 ...node.childs.filter(n => n.dbTail === null)
    //             ]
    //         }
    //
    //         if (node.isDeleted) {
    //             setIsDeleted(tree)
    //         }
    //     }
    //
    //     for (let i = 0; i < node.childs.length; i++) {
    //         insertNode(node.childs[i])
    //     }
    // }
    //
    //
    // cacheTree = cacheTree.sort((a: Node, b: Node) => {
    //     if (a.dbTail && b.dbTail) {
    //         if (a.dbTail.level > b.dbTail.level) {
    //             return -1
    //         } else {
    //             return 1
    //         }
    //     }
    //     return 0
    // })
    //
    cacheTree.forEach((treeEl: Node) => {
        insertNode(tree, treeEl, treeEl.parentId)
    })


    res.status(200).json(tree)
}

export const resetTree = (req: Request, res: Response) => {
    (global as any).tree = new TreeFactory().init();

    res.status(200).json((global as any).tree)
}


function findNode(tree: Node, index: number, parentId: number): Node | void {
    if (!tree) return
    if (tree.id === parentId) return tree.childs[index]

    for (let i = 0; i < tree.childs.length; i++) {
        const r = findNode(tree.childs[i], index, parentId)
        if (r) {
            return r
        }
    }
}

function insertNode(tree: Node, node: Node, parentId: number | null): Node | void {
    if (!node) return
    if (node.id === parentId)  {
        tree.childs.push(node)
        return tree
    }

    for (let i = 0; i < node.childs.length; i++) {
        const r = insertNode(tree, node.childs[i], parentId)
        if (r) {
            return r
        }
    }
}