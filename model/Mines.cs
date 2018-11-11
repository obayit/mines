using System;

namespace mines.model{
    public class Mines{
        public int[][] mines { get; set; }
        public int minesCount;
        public int width;
        public int height;
        public Mines(int width, int height, int minesCount){
            this.minesCount = minesCount;
            this.width = width;
            this.height= height;
            mines = new int[width][];
            for(var i=0; i<mines.Length; i++){
                mines[i] = new int [height];
            }
        }
        public void initMine(){
            var rnd = new Random();
            for(var i=minesCount; i>0; i--){
                var xPos = rnd.Next(1, width-1);
                var yPos = rnd.Next(1, height-1);
                mines[xPos][yPos] = -1;
            }
        }
    }
}