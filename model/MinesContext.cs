using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace mines.model{
    public class MinesContext : DbContext{
        public MinesContext(DbContextOptions<MinesContext> options)
            : base(options){ }

        public DbSet<Mines> Mines { get; set; }
        public DbSet<Mine> Mine { get; set; }
    }
}