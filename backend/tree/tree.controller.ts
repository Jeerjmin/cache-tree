import { Request, Response } from 'express';
import { unionBy as lUnion } from 'lodash'
import {Tree, TreeFactory} from './index'
import {Node} from '../../interfaces'

export const getTree = (req: Request, res: Response) => {
    res.status(200).json((global as any).tree)
}

export const getNode = (req: Request, res: Response) => {
    const { tree } = global as any
    const { index, parentId } = req.query

    if (!parentId) {
        res.status(200).json({ ...tree, childs: [] })
    } else {
        const node = findNode(tree, Number(index), Number(parentId))
        const nodeWithoutChilds = { ...node, childs: [] }

        res.status(200).json(nodeWithoutChilds)
    }
}

export const applyTree = (req: Request, res: Response) => {
    let { tree } = global as any

    let { trees: cacheTree } = req.body

    cacheTree = cacheTree.sort((a: Node, b: Node) => {
        if (a.level > b.level) {
            return 1
        } else {
            return -1
        }
    })

    cacheTree.forEach((treeEl: Node) => {
       insertNode(tree, treeEl)
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

function insertNode(tree: Node, node: Node): Node | void {
    if (!node) return
    if (node.parentId === null && node.index === null) {
        let result: any = { childs: [] }
        insertCacheNodes(result, tree, node);
        Object.assign(tree, result)

        return tree
    } else
        if (tree.id === node.parentId && node.index !== null)  {
        let result: Node = new Tree(0, '0', 1, null, [], null)
        insertCacheNodes(result, tree.childs[node.index], node)
        tree.childs[node.index] = result

        return tree
    }

    for (let i = 0; i < tree.childs.length; i++) {
        const r = insertNode(tree.childs[i], node)
        if (r) {
            return r
        }
    }
}

function insertCacheNodes(result: Node, tree: Node, node: Node | undefined) {
    if (!node) return
    Object.assign(result, {...node, childs: lUnion(tree.childs, node.childs, 'id') } )
    if (result.isDeleted) {
        setIsDeleted(result)
    }
    for (let i = 0; i < tree.childs.length; i++) {
        insertCacheNodes(result.childs[i], tree.childs[i], node.childs.find(n => n.id === tree.childs[i].id))
    }
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