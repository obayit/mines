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
            await Clients.All.SendAsync("Clicked", x, y);
        }
        public async Task Flagged(int x, int y, bool isSignalrTriggered){
            // _gameEvents.Flagged(_mines, x, y, flagged);
            await Clients.All.SendAsync("Flagged", x, y, true);
        }
    }
}