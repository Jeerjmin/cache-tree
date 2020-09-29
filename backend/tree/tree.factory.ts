import {Tree} from './tree.model'

export class TreeFactory {

    public init() {
        return new Tree(0, '0', 1, null,
            [
                new Tree(1, '1', 2, 0,[
                    new Tree(3, '3', 3, 0, [
                        new Tree(7, '7', 4, 0, [
                            new Tree(15, '15', 5, 0, [], 7)
                        ], 3),
                        new Tree(8, '8', 4, 1, [
                            new Tree(16, '16', 5, 0, [], 8),
                            new Tree(17, '17', 5, 1, [
                                new Tree(18, '18', 6, 0, [], 17)
                            ], 8)
                        ], 3)
                    ], 1),
                    new Tree(4, '4', 3, 1, [
                        new Tree(9, '9', 4, 0, [], 4),
                        new Tree(10, '10', 4, 1,[], 4)
                    ], 1)
                ], 0),
                new Tree(2, '2', 2, 1,  [
                    new Tree(5, '5', 3, 0, [
                        new Tree(11, '11', 4, 0, [], 5),
                        new Tree(12, '12', 4, 1, [], 5)
                    ], 2),
                    new Tree(6, '6', 3, 1, [
                        new Tree(13, '13', 4, 0, [], 6),
                        new Tree(14, '14',  4, 1,[], 6)
                    ], 2)
                ], 0)
            ], null)
    }
}