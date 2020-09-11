import {Tree} from './tree.model'

export class TreeFactory {

    public init() {
        return new Tree(0, '0', 
            [
                new Tree(1, '1', [
                    new Tree(3, '3', [
                        new Tree(7, '7', [
                            new Tree(15, '15', [], 7)
                        ], 3),
                        new Tree(8, '8', [
                            new Tree(16, '16', [], 8),
                            new Tree(17, '17', [
                                new Tree(18, '18', [], 17)
                            ], 8)
                        ], 3)
                    ], 1),
                    new Tree(4, '4', [
                        new Tree(9, '9', [], 4),
                        new Tree(10, '10', [], 4)
                    ], 1)
                ], 0),
                new Tree(2, '2', [
                    new Tree(5, '5', [
                        new Tree(11, '11', [], 5),
                        new Tree(12, '12', [], 5)
                    ], 2),
                    new Tree(6, '6', [
                        new Tree(13, '13', [], 6),
                        new Tree(14, '14', [], 6)
                    ], 2)
                ], 0)
            ], null)
    }
}