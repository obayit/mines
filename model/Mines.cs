using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace mines.model{
    public class Mine{
        public int x;//
                     // TODO: use x, y properties instead of the array, to save it in the database. Or save it as json string(parsing is fairly simple)
        public int y;//
        public int value;
        public string bgColor;
        public bool isClicked = false;
        public bool flagged = false;
        public Mines mines { get; set; }
    }
    public class Mines{
        [Key]
        public int Id { get; set; }
        public List<List<Mine>> mines { get; set; }
        public int minesCount;
        public int width;
        public int height;
        public Mines(int width, int height, int minesCount){
            this.minesCount = minesCount;
            this.width = width;
            this.height= height;
            mines = new List<List<Mine>>(height);
            for(var i=0; i<mines.Count; i++){
                mines[i] = _initMinesList(width);
            }
        }
        private List<Mine> _initMinesList(int length){
            var res = new List<Mine>(length);
            for(var i=0; i<res.Count; ++i){
                res[i] = new Mine(){
                    bgColor = "bgDefault"
                };
            }
            return res;
        }
        public void initMine(){
            var rnd = new Random();
            for(var i=minesCount; i>0; i--){
                var xPos = rnd.Next(1, height-1);
                var yPos = rnd.Next(1, width-1);
                mines[xPos][yPos] = new Mine(){
                    value = -1,
                    bgColor = "bgDefault"
                };
            }
            for(var i=0; i<height; ++i){
                for(var j=0; j<width; ++j){
                    generateNumber(i, j);
                }
            }
        }
        private void generateNumber(int x, int y){
            /*
                reference x,y array:
                0,0 0,1 0,2
                1,0 1,1 1,2
                2,0 2,1 2,2
             */
            if(mines[x][y].value == -1){
                return;
            }
            int res = 0;
            res += topLeftCorner(x, y);
            res += topCenter(x, y);
            res += topRightCorner(x, y);
            res += leftCenter(x, y);
            res += rightCenter(x, y);
            res += bottomLeftCorner(x, y);
            res += bottomCenter(x, y);
            res += bottomRightCorner(x, y);
            mines[x][y].value = res;
        }
        private int topLeftCorner(int x, int y){
            if((x>0 && y>0) &&
                mines[x-1][y-1].value == -1){// top left corner
                return 1;
            }
            return 0;
        }
        private int topCenter(int x, int y){
            if((x>0) &&
                mines[x-1][y].value == -1){// top left corner
                return 1;
            }
            return 0;
        }
        private int topRightCorner(int x, int y){
            if((x>0 && y<width-1) &&
                mines[x-1][y+1].value == -1){// top left corner
                return 1;
            }
            return 0;
        }
        private int leftCenter(int x, int y){
            if((y>0) &&
                mines[x][y-1].value == -1){// top left corner
                return 1;
            }
            return 0;
        }
        private int bottomLeftCorner(int x, int y){
            if((x<height-1 && y>0) &&
                mines[x+1][y-1].value == -1){// top left corner
                return 1;
            }
            return 0;
        }
        private int bottomCenter(int x, int y){
            if((x<height-1) &&
                mines[x+1][y].value == -1){// top left corner
                return 1;
            }
            return 0;
        }
        private int bottomRightCorner(int x, int y){
            if((x<height-1 && y<width-1) &&
                mines[x+1][y+1].value == -1){// top left corner
                return 1;
            }
            return 0;
        }
        private int rightCenter(int x, int y){
            if((y<width-1) &&
                mines[x][y+1].value == -1){// top left corner
                return 1;
            }
            return 0;
        }
    }
}