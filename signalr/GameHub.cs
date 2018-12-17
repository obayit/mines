using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using mines.services;
using mines.model;

namespace mines.signalr{
    public class GameHub : Hub{
        private IGameEvents _gameEvents;
        private Mines _mines;
        public GameHub(
            IGameEvents gameEvents,
            Mines mines
            ){
            _gameEvents = gameEvents;
            _mines = mines;
        }

        public async Task Clicked(int x, int y)
        {
            _gameEvents.Clicked(_mines, x, y);
            await Clients.Others.SendAsync("Clicked", x, y);
        }
        public async Task Flagged(int x, int y, bool flag){
            _gameEvents.Flagged(_mines, x, y, flag);
            await Clients.Others.SendAsync("Flagged", x, y, flag);
        }
        public async Task Restart(int x, int y)
        {
            var res = _gameEvents.Restart(_mines);
            await Clients.Others.SendAsync("Restart", res);
        }
    }
}