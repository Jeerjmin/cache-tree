import { TreeFactory } from './tree'

export default () => {
    (global as any).tree = new TreeFactory().init()
}