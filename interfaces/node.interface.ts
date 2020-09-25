export interface Node {
    id: number;
    value: string;
    parentId: number | null;
    childs: Node[];
    isDeleted: boolean;
    level: number;
    index: number | null
}
