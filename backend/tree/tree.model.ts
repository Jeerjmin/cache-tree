import { Node } from '../../interfaces'

export class Tree implements Node {
    public id: number
    public value: string
    public parentId: number | null;
    public childs: Node[] = [];
    public isDeleted: boolean = false;

    constructor(id: number, value: string, childs: Node[], parentId: number | null) {
        this.id = id,
        this.value = value;
        this.childs = childs;
        this.parentId = parentId;
    }
    
    private makePath(level: number, indexes: number[], withValue = true): string {
        let path = ''
        for (let i = 1; i <= level; i++) {
          path += 'childs'

          if (indexes[i-1] !== undefined) {
            path += '[' + indexes[i-1] + ']' + '.'
          }
        }
      
        if (withValue) {
          path += 'value'
        } else {
          path = path.slice(0, path.length - 1)
        }
      
        return path
      }
    
    
    private setIsDeleted(node: Node) {
        const n = node;
        node.isDeleted = true;
        if (n.childs && n.childs.length > 0) {
            n.childs.forEach((v: Node) => {
                this.setIsDeleted(v);
            });
        }
        return n;
    }

    private setIndexes(node: Node) {
      const n = node;
      let { id } = n

      n.childs.forEach(_ => id++)
      id++

      n.id = id

      node.isDeleted = true;
      if (n.childs && n.childs.length > 0) {
          n.childs.forEach((v: Node) => {
              this.setIsDeleted(v);
          });
      }
      return n;
  }
}