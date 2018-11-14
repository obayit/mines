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
        [HttpGet("[action]")]
        public JsonResult getMines(){
            var m = new Mines(10, 12, 15);
            m.initMine();
            var res = new MinesInfo();
            res.width = m.width;
            res.height = m.height;
            res.minesCount = m.minesCount;
            res.mines = m.mines;
            return new JsonResult(res);
        }
    }
}
