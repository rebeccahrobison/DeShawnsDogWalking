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
    new Dog { Id = 2, Name = "Zelda", CityId = 2 },
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
        Walker = walkers.FirstOrDefault(w => w.Id == d.WalkerId) == null ? null : new WalkerDTO
        {
            Id = d.WalkerId ?? 0,
            Name = walkers.First(w => w.Id == d.WalkerId).Name
        },
        CityId = d.CityId,
        City = cities.FirstOrDefault(c => c.Id == d.CityId) == null ? null : new CityDTO
        {
            Id = d.CityId,
            Name = cities.First(c => c.Id == d.CityId).Name
        }
    });
});

app.MapGet("/api/dogs/{id}", (int id) =>
{
    Dog dog = dogs.FirstOrDefault(d => d.Id == id);
    if (dog == null)
    {
        return Results.NotFound();
    }

    Walker walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
    City city = cities.FirstOrDefault(c => c.Id == dog.CityId);

    return Results.Ok(new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = dog.WalkerId,
        Walker = walker == null ? null : new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name
        },
        CityId = dog.CityId,
        City = city == null ? null : new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        }
    });
});

app.MapPost("/api/dogs", (Dog dog) =>
{
    dog.Id = dogs.Max(d => d.Id) + 1;
    City city = cities.FirstOrDefault(c => c.Id == dog.CityId);

    if (city == null)
    {
        return Results.BadRequest();
    }

    dogs.Add(dog);

    return Results.Created($"/api/dogs/{dog.Id}", new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        CityId = dog.CityId
    });
});

app.MapGet("/api/walkers", () =>
{
    return walkers.Select(w => new WalkerDTO
    {
        Id = w.Id,
        Name = w.Name
    });
});

app.MapGet("/api/walkers/{id}", (int id) =>
{
    Walker walker = walkers.FirstOrDefault(w => w.Id == id);
    if (walker == null)
    {
        return Results.NotFound();
    }
    List<WalkerCity> foundWalkerCities = walkerCities.Where(wc => wc.WalkerId == id).ToList();
    List<City> foundCities = foundWalkerCities.Select(wc => cities.First(c => c.Id == wc.CityId)).ToList();
    // walker.Cities = foundCities;

    return Results.Ok(new WalkerDTO
    {
        Id = walker.Id,
        Name = walker.Name,
        Cities = foundCities.Select(fc => new CityDTO
        {
            Id = fc.Id,
            Name = fc.Name
        }).ToList()
    });
});

app.MapGet("api/cities", () =>
{
    return cities.Select(c => new CityDTO
    {
        Id = c.Id,
        Name = c.Name
    });
});

app.MapGet("/api/cities/{id}", (int id) =>
{
    City city = cities.FirstOrDefault(c => c.Id == id);
    if (city == null)
    {
        return Results.NotFound();
    }
    List<WalkerCity> foundWalkerCities = walkerCities.Where(wc => wc.CityId == id).ToList();
    List<Walker> foundWalkers = foundWalkerCities.Select(wc => walkers.First(w => w.Id == wc.WalkerId)).ToList();

    return Results.Ok(new CityDTO
    {
        Id = city.Id,
        Name = city.Name,
        Walkers = foundWalkers.Select(fw => new WalkerDTO
        {
            Id = fw.Id,
            Name = fw.Name
        }).ToList()
    });
});

app.MapPut("/api/dogs/{id}", (int id, Dog dog) =>
{
    Dog dogToUpdate = dogs.FirstOrDefault(d => d.Id == id);

    if (dogToUpdate == null)
    {
        return Results.NotFound();
    }
    if (id != dog.Id)
    {
        return Results.BadRequest();
    }

    dogToUpdate.Name = dog.Name;
    dogToUpdate.WalkerId = dog.WalkerId;
    dogToUpdate.CityId = dog.CityId;

    return Results.NoContent();
});

app.MapPost("api/cities", (City city) =>
{
    city.Id = cities.Max(c => c.Id) + 1;
    cities.Add(city);

    return Results.Created($"api/cities/{city.Id}", new CityDTO
    {
        Id = city.Id,
        Name = city.Name
    });
});

app.MapPut("api/walkers/{id}", (int id, Walker walker) =>
{
    // deletes walkerCities that walker previously had
    walkerCities = walkerCities.Where(wc => wc.WalkerId != walker.Id).ToList();

    foreach (City city in walker.Cities)
    {
        WalkerCity newWC = new WalkerCity
        {
            WalkerId = walker.Id,
            CityId = city.Id
        };
        newWC.Id = walkerCities.Count > 0 ? walkerCities.Max(wc => wc.Id) + 1 : 1;
        walkerCities.Add(newWC);
    }

    Walker walkerToUpdate = walkers.FirstOrDefault(w => w.Id == id);
    if (walkerToUpdate == null)
    {
        return Results.NotFound();
    }
    if (id != walker.Id)
    {
        return Results.BadRequest();
    }

    walkerToUpdate.Name = walker.Name;

    return Results.NoContent();
});

app.Run();
