// using System.Text.Json.Serialization;
using DeShawnsDogWalking.Models;
using DeShawnsDogWalking.Models.DTOs;

List<City> cities = new List<City>
{
    new City { Id = 1, Name = "Franklin" },
    new City { Id = 2, Name = "Brentwood" },
    new City { Id = 3, Name = "Ashland City" },
    new City { Id = 4, Name = "Gallatin" },
    new City { Id = 5, Name = "Kingston Springs" },
    new City { Id = 6, Name = "Clarksville" },
    new City { Id = 7, Name = "Murfreesboro" },
    new City { Id = 8, Name = "Nashville" },
    new City { Id = 9, Name = "Hendersonville" },
    new City { Id = 10, Name = "Spring Hill" }
};

List<Dog> dogs = new List<Dog>
{
    new Dog { Id = 1, Name = "Luigi", WalkerId = 6, CityId = 1 },
    new Dog { Id = 2, Name = "Zelda", WalkerId = 5, CityId = 2 },
    new Dog { Id = 3, Name = "Chell", WalkerId = 4, CityId = 3 },
    new Dog { Id = 4, Name = "Sonic", WalkerId = 3, CityId = 4 },
    new Dog { Id = 5, Name = "Guybrush", WalkerId = 2, CityId = 5 },
    new Dog { Id = 6, Name = "Geralt", WalkerId = 1, CityId = 6 },
    new Dog { Id = 7, Name = "Sebastian", WalkerId = 6, CityId = 7 },
    new Dog { Id = 8, Name = "Wheatley", WalkerId = 5, CityId = 8 },
    new Dog { Id = 9, Name = "Cortana", WalkerId = 1, CityId = 9 },
    new Dog { Id = 10, Name = "Pikachu", WalkerId = 2, CityId = 10 },
    new Dog { Id = 11, Name = "Aloy", WalkerId = 3, CityId = 1 },
    new Dog { Id = 12, Name = "LeChuck", WalkerId = 4, CityId = 2 },
    new Dog { Id = 13, Name = "Samus", WalkerId = 5, CityId = 3 },
    new Dog { Id = 14, Name = "Bella Goth", WalkerId = 6, CityId = 4 }
};

List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 1, Name = "Ewan" },
    new Walker { Id = 2, Name = "Fiona" },
    new Walker { Id = 3, Name = "Hamish" },
    new Walker { Id = 4, Name = "Isobel" },
    new Walker { Id = 5, Name = "Lachlan" },
    new Walker { Id = 6, Name = "Mhairi" },
};


List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity { Id = 1, WalkerId = 1, CityId = 1 },
    new WalkerCity { Id = 2, WalkerId = 1, CityId = 2 },
    new WalkerCity { Id = 3, WalkerId = 2, CityId = 3 },
    new WalkerCity { Id = 4, WalkerId = 3, CityId = 4 },
    new WalkerCity { Id = 5, WalkerId = 3, CityId = 5 },
    new WalkerCity { Id = 6, WalkerId = 4, CityId = 6 },
    new WalkerCity { Id = 7, WalkerId = 4, CityId = 7 },
    new WalkerCity { Id = 8, WalkerId = 5, CityId = 8 },
    new WalkerCity { Id = 9, WalkerId = 5, CityId = 9 },
    new WalkerCity { Id = 10, WalkerId = 6, CityId = 10 },
    new WalkerCity { Id = 11, WalkerId = 6, CityId = 1 },
    new WalkerCity { Id = 12, WalkerId = 6, CityId = 2 },
    new WalkerCity { Id = 13, WalkerId = 1, CityId = 3 },
    new WalkerCity { Id = 14, WalkerId = 3, CityId = 4 },
    new WalkerCity { Id = 15, WalkerId = 6, CityId = 5 }
};


var builder = WebApplication.CreateBuilder(args);

// builder.Services.Configure<JsonOptions>(options =>
// {
//     options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
// });

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();



app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/test", () =>
{
    return new { Message = "Testing the API" };
});


app.MapGet("/api/dogs", () =>
{
    return dogs.Select(d => new DogDTO
    {
        Id = d.Id,
        Name = d.Name,
        WalkerId = d.WalkerId,
        CityId = d.CityId
    });
});




app.Run();
