using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WaterPlants;

namespace WaterPlants.Data
{
    public class WaterPlantsContext : DbContext
    {
        public WaterPlantsContext (DbContextOptions<WaterPlantsContext> options)
            : base(options)
        {
        }

        public DbSet<WaterPlants.Plant> Plant { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Plant>().HasData(
                new Plant { LastWatered = DateTime.Now, Id = 1 },
                new Plant { LastWatered = DateTime.Now, Id = 2 },
                new Plant { LastWatered = DateTime.Now, Id = 3 },
                new Plant { LastWatered = DateTime.Now, Id = 4 },
                new Plant { LastWatered = DateTime.Now, Id = 5 }
            );
        }
    }
}