using System;
using mines.model;
using mines.ViewModels;

namespace mines.services
{
    public interface IGameEvents
    {
        void Clicked(Mines mines, int x, int y);
        [Obsolete]
        void Flagged(Mines mines, int x, int y, bool flagged);
        MinesInfo Restart(Mines mines);
    }
    public class GameEvents : IGameEvents{
        public void Clicked(Mines mines, int x, int y){
            mines.mines[x][y].isClicked = true;
            mines.mines[x][y].bgColor = "opened";
        }
        public void Flagged(Mines mines, int x, int y, bool flagged){
            mines.mines[x][y].flagged = flagged;
        }
        public MinesInfo Restart(Mines mines){
            mines.reset();
            var res = new MinesInfo();
            res.width = mines.width;
            res.height = mines.height;
            res.minesCount = mines.minesCount;
            res.mines = mines.mines;
            return res;
        }
    }
}