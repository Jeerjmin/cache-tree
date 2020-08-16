export class TreeNodeFactory {

    public init() {
        return new TreeNode(0, 0, 
            [
                new TreeNode(1, 1, [
                    new TreeNode(3, 3, [
                        new TreeNode(7, 7, []),
                        new TreeNode(8, 8, [])
                    ]),
                    new TreeNode(4, 4, [
                        new TreeNode(9, 9, []),
                        new TreeNode(10, 10, [])
                    ])
                ]),
                new TreeNode(2, 2, [
                    new TreeNode(5, 5, [
                        new TreeNode(11, 11, []),
                        new TreeNode(12, 12, [])
                    ]),
                    new TreeNode(6, 6, [
                        new TreeNode(13, 13, []),
                        new TreeNode(14, 14, [])
                    ])
                ])
            ])
    }
}

export class TreeNode {
    public id: Number
    public value: Number | null = null;
    public childs: TreeNode[] = [];

    constructor(id: Number, value: Number, childs: TreeNode[]) {
        this.id = id,
        this.value = value;
        this.childs = childs;
    }

    public getById(id: Number) {

    }
}