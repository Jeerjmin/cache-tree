import { Path } from "./path.interface";

export interface Node {
    id: number;
    value: string;
    parentId: number | null;
    childs: Node[];
    isDeleted: boolean;
    dbTail?: Path
}
