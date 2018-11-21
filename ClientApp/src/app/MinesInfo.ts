export class Mine{
    value: number;
    bgColor: string;
    isClicked: boolean = false;
    flagged: boolean = false;
}
export class MinesInfo{
    width: number;
    height: number;
    minesCount: number;
    values: number[][];
    mines: Mine[][];
}
