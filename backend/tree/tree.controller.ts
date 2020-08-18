import { Request, Response } from 'express';
import { updateWith as lUpdate, cloneDeep as lDeepClone } from 'lodash'
import {Tree, TreeFactory} from './index'
import {Node} from '../../interfaces'

export const getTree = (req: Request, res: Response) => {
    res.status(200).json((global as any).tree)
}

export const applyTree = (req: Request, res: Response) => {
    let { tree } = global as any
    
    let { dbPath, tree: cacheTree } = req.body
            
    const { level, indexes } = dbPath
    
    const path = tree.makePath(level, indexes, false)

    if (path === '') {
        tree = {
            ...tree, 
            value: cacheTree.value, 
            isDeleted: cacheTree.isDeleted,
            childs: [
                ...tree.childs, 
                ...cacheTree.childs 
            ] 
        }

        tree = new Tree(tree.id, tree.value, tree.childs);

        if (cacheTree.isDeleted) {
            tree = tree.setIsDeleted(tree)
        }
        
    } else {
        tree = lUpdate(lDeepClone(tree), path, function (node: Node) {

            if (cacheTree.isDeleted) {
                node = tree.setIsDeleted(node)
            }

            return {
                ...node, 
                value: cacheTree.value, 
                isDeleted: cacheTree.isDeleted,
                childs: [
                    ...node.childs, 
                    ...cacheTree.childs 
                ] 
            }
        })
    }

    (global as any).tree = tree


    res.status(200).json(tree)
}

export const resetTree = (req: Request, res: Response) => {
    (global as any).tree = new TreeFactory().init();

    res.status(200).json((global as any).tree)
}
