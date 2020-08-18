import {Tree} from './tree.model'

export class TreeFactory {

    public init() {
        return new Tree(0, '0', 
            [
                new Tree(1, '1', [
                    new Tree(3, '3', [
                        new Tree(7, '7', []),
                        new Tree(8, '8', [])
                    ]),
                    new Tree(4, '4', [
                        new Tree(9, '9', []),
                        new Tree(10, '10', [])
                    ])
                ]),
                new Tree(2, '2', [
                    new Tree(5, '5', [
                        new Tree(11, '11', []),
                        new Tree(12, '12', [])
                    ]),
                    new Tree(6, '6', [
                        new Tree(13, '13', []),
                        new Tree(14, '14', [])
                    ])
                ])
            ])
    }
}