import { Request, Response } from 'express';
import { updateWith as lUpdate, cloneDeep as lDeepClone } from 'lodash'
import {Tree, TreeFactory} from './index'
import {Node} from '../../interfaces'

export const getTree = (req: Request, res: Response) => {
    res.status(200).json((global as any).tree)
}

export const applyTree = (req: Request, res: Response) => {
    let { tree } = global as any
    
    let { dbPath, trees: cacheTree } = req.body

    dbPath.forEach((el: any) => {
        const path = tree.makePath(el.level, el.indexes, false)
        console.log('path', path)

        if (path === '') {
            tree = {
                ...tree,
                value: cacheTree[0].value,
                isDeleted: cacheTree[0].isDeleted,
                childs: [
                    ...tree.childs,
                    ...cacheTree[0].childs
                ]
            }


            if (cacheTree.isDeleted) {
                tree = tree.setIsDeleted(tree)
            }

        }
    })

    console.log('result', tree)
    console.log('apply', dbPath, cacheTree)

    res.status(200).json(tree)
}

export const resetTree = (req: Request, res: Response) => {
    (global as any).tree = new TreeFactory().init();

    res.status(200).json((global as any).tree)
}
