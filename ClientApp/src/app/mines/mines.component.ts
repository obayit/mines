import { Component, OnInit } from '@angular/core';
// import { trigger, state, style, animate, transition } from '@angular/animations'

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { MinesService } from '../mines.service';
import { MinesInfo, Mine } from '../MinesInfo';
import { SignalrServiceService, ClickSignalData } from '../signalr-service.service';

@Component({
  selector: 'app-mines',
  templateUrl: './mines.component.html',
  styleUrls: ['./mines.component.css'],
  // animations: [
  //   state('open', style({
  //   }))
  // ]
})
export class MinesComponent implements OnInit {
  minesInfo: MinesInfo;
  viewModel: number[][];
  viewModelClass: string[][];
  widthArray: number[];
  heightArray: number[];
  height: number;
  width: number;
  flaggedClass: string = "fa fa-flag";
  gameoverText = 'Game Over';

  isGameOver: boolean = false;

  constructor(
    private minesService: MinesService,
    private signalrService: SignalrServiceService
  ) { }

  ngOnInit() {
    console.log('ngOnInit()')
    this.signalrService.clickSignalData.subscribe( next =>{
        console.log(`signalr clicked: ${next.x}, ${next.y}`);
        this.onClick(next.x, next.y);
    });
    this.signalrService.flagSignalData.subscribe( next =>{
        console.log(`signalr flagged: ${next.x}, ${next.y} isSignalrTriggered ${next.flag}`);
        this.flagChanged(next.x, next.y, next.flag);
    });
    this.signalrService.restartGame.subscribe( next =>{
        console.log(`signalr restartGame`);
        this.getMines();
    });
    this.getMines();
  }

  getMines() {
    this.minesService.getMines()
    .subscribe( res => {
      console.log(res);
      this.minesInfo = res;
      this.height = res.height;
      this.width = res.width;
      this.widthArray = Array(res.width).fill(0).map((x, i)=>i);
      this.heightArray = Array(res.height).fill(0).map((x, i)=>i);
      this.viewModel = new Array<Array<number>>(this.minesInfo.height);
      for(let i=0; i<this.minesInfo.height;++i){
        this.viewModel[i] = new Array<number>(this.minesInfo.width);
        for(let j=0; j<this.minesInfo.width;++j){
          //meh
          // this.viewModel[i][j] = res.mines[i][j].value;
          if(res.mines[i][j].isClicked){
            this.viewModel[i][j] = res.mines[i][j].value;
          }
        }
      }
    });
  }

  flagChanged(x: number, y: number, flag: boolean = false){
    let mine = this.minesInfo.mines[x][y];
    if(!mine.isClicked){
      mine.flagged = flag;
    }
  }
  onRightClick(x: number, y: number){
    let mine = this.minesInfo.mines[x][y];
    if(!mine.isClicked){
      mine.flagged = !mine.flagged;
      this.signalrService.OnFlagged(x, y, mine.flagged);
    }
    return false;
  }
  onClick(x: number, y: number){
    if(this.minesInfo.mines[x][y].isClicked
      || this.minesInfo.mines[x][y].flagged){
      return;
    }
    this.signalrService.OnClicked(x, y);
    this.minesInfo.mines[x][y].isClicked = true;
    this.minesInfo.mines[x][y].bgColor = "opened";
    let mine = this.minesInfo.mines[x][y];
    if(mine.value == 0){
      console.log(`zero at ${x}, ${y}`)
      this.clickNeighbors(x, y);
    }
    this.viewModel[x][y] = mine.value;
    if(mine.value == -1){
      this.gameOver();
    }
    console.log(`user clicked (${x}, ${y})`);
  }
  onDbClick(x: number, y: number){
    console.log("dbClick");
    if(this.countFlaggedNeighbors(x, y) < this.minesInfo.mines[x][y].value){
      return;
    }
    this.onClick(x, y);
    this.clickNeighbors(x, y);
  }
  gameOver(){
    this.isGameOver = true;
    for(let i=0; i<this.minesInfo.height;++i){
      for(let j=0; j<this.minesInfo.width;++j){
        this.viewModel[i][j] = this.minesInfo.mines[i][j].value;
      }
    }
  }
  restartGame(){
    this.resetGame();
  }

  resetGame() {
    this.minesService.resetMines()
    .subscribe( res => {
      this.signalrService.OnRestart();
      this.minesInfo = res;
      this.height = res.height;
      this.width = res.width;
      this.widthArray = Array(res.width).fill(0).map((x, i)=>i);
      this.heightArray = Array(res.height).fill(0).map((x, i)=>i);
      this.viewModel = new Array<Array<number>>(this.minesInfo.height);
      for(let i=0; i<this.minesInfo.height;++i){
        this.viewModel[i] = new Array<number>(this.minesInfo.width);
      }
      this.isGameOver = false;
    })
  }

  clickNeighbors(x: number, y: number){
      this._openBottomCenter(x, y);
      this._openBottomLeftCorner(x, y);
      this._openBottomRightCorner(x, y);
      this._openLeftCenter(x, y);
      this._openRightCenter(x, y);
      this._openTopCenter(x, y);
      this._openTopLeftCorner(x, y);
      this._openTopRightCorner(x, y);
  }

  private _openTopLeftCorner(x: number, y: number){
    if((x>0 && y>0)){// top left corner
      this.onClick(x - 1, y - 1);
    }
  }
  private _openTopCenter(x: number, y: number){
    if((x>0)){
        this.onClick(x-1, y);// top left corner
    }
  }
  private _openTopRightCorner(x: number, y: number){
    if((x>0 && y<this.width-1)){
        this.onClick(x-1, y+1);// top left corner
    }
  }
  private _openLeftCenter(x: number, y: number){
    if((y>0)){
        this.onClick(x, y-1);// top left corner
    }
  }
  private _openBottomLeftCorner(x: number, y: number){
    if((x<this.height-1 && y>0)){
        this.onClick(x+1, y-1);// top left corner
    }
  }
  private _openBottomCenter(x: number, y: number){
    if((x<this.height-1)){
        this.onClick(x+1, y);// top left corner
    }
  }
  private _openBottomRightCorner(x: number, y: number){
    if((x<this.height-1 && y<this.width-1)){
        this.onClick(x+1, y+1);// top left corner
    }
  }
  private _openRightCenter(x: number, y: number){
    if((y<this.width-1)){
        this.onClick(x, y+1);// top left corner
    }
  }

  say(x: string){
    console.log(x);
  }

  countFlaggedNeighbors(x: number, y: number){
    var res = 0;
    res += this._flaggedBottomCenter(x, y);
    res += this._flaggedBottomLeftCorner(x, y);
    res += this._flaggedBottomRightCorner(x, y);
    res += this._flaggedLeftCenter(x, y);
    res += this._flaggedRightCenter(x, y);
    res += this._flaggedTopCenter(x, y);
    res += this._flaggedTopLeftCorner(x, y);
    res += this._flaggedTopRightCorner(x, y);
    return res;
  }
  private _flaggedTopLeftCorner(x: number, y: number): number{
    if((x>0 && y>0) && // top left corner
      this.minesInfo.mines[x - 1][y - 1].flagged){
        return 1;
      }
    return 0;
  }
  private _flaggedTopCenter(x: number, y: number): number{
    if((x>0) &&
    this.minesInfo.mines[x-1][y].flagged){// top left corner
      return 1;
    }
    return 0;
  }
  private _flaggedTopRightCorner(x: number, y: number): number{
    if((x>0 && y<this.width-1) &&
      this.minesInfo.mines[x-1][y+1].flagged){// top left corner
        return 1;
    }
    return 0;
  }
  private _flaggedLeftCenter(x: number, y: number): number{
    if((y>0) &&
      this.minesInfo.mines[x][y-1].flagged){// top left corner
        return 1;
    }
    return 0;
  }
  private _flaggedBottomLeftCorner(x: number, y: number): number{
    if((x<this.height-1 && y>0) &&
        this.minesInfo.mines[x+1][y-1].flagged){// top left corner
          return 1;
        }
    return 0;
  }
  private _flaggedBottomCenter(x: number, y: number): number{
    if((x<this.height-1) &&
        this.minesInfo.mines[x+1][y].flagged){// top left corner
          return 1;
        }
    return 0;
  }
  private _flaggedBottomRightCorner(x: number, y: number): number{
    if((x<this.height-1 && y<this.width-1) &&
        this.minesInfo.mines[x+1][y+1].flagged){// top left corner
          return 1;
        }
    return 0;
  }
  private _flaggedRightCenter(x: number, y: number): number{
    if((y<this.width-1) &&
      this.minesInfo.mines[x][y+1].flagged){// top left corner
        return 1;
      }
    return 0;
  }

}
