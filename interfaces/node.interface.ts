export interface Node {
    id: number;
    value: string;
    childs: Node[];
    isDeleted: boolean;
}
