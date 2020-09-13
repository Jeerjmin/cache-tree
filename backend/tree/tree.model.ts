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
}