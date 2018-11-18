using System;
using mines.model;

namespace mines.services
{
    public interface IGameEvents
    {
        void Clicked(Mines mines, int x, int y);
        [Obsolete]
        void Flagged(Mines mines, int x, int y, bool flagged);
    }
    public class GameEvents : IGameEvents{
        public void Clicked(Mines mines, int x, int y){
            mines.mines[x][y].isClicked = true;
        }
        [Obsolete]
        public void Flagged(Mines mines, int x, int y, bool flagged){
            mines.mines[x][y].flagged = flagged;
        }
    }
}