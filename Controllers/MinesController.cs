using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using mines.model;

namespace mines.Controllers
{
    [Route("api/[controller]")]
    public class MinesController : Controller
    {
        public class MinesInfo{
            public int width;
            public int height;
            public int minesCount;
            public Mine[][] mines;
        }
        private Mines _mines;
        public MinesController(
            Mines mines
        ){
            _mines = mines;
        }
        [HttpGet("[action]")]
        public JsonResult getMines(){
            var res = new MinesInfo();
            res.width = _mines.width;
            res.height = _mines.height;
            res.minesCount = _mines.minesCount;
            res.mines = _mines.mines;
            return new JsonResult(res);
        }
    }
}
