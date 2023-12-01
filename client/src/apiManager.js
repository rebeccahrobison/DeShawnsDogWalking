export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getDogs = async () => {
  const res = await fetch("/api/dogs");
  return res.json();
}

export const getDogById = async (id) => {
  const res = await fetch(`/api/dogs/${id}`);
  return res.json();
}

export const getWalkers = async () => {
  const res = await fetch("/api/walkers");
  return res.json();
}

export const getWalkerById = async (id) => {
  const res = await fetch(`/api/walkers/${id}`);
  return res.json();
}

export const getCities = async () => {
  const res = await fetch("/api/cities");
  return res.json();
}

export const getCityById = async (id) => {
  const res = await fetch(`/api/cities/${id}`);
  return res.json();
}

export const addDog = (dog) => {
  return fetch(`/api/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog)
  })
}

export const addWalkerToDog = (id, dogObj) => {
  return fetch(`/api/dogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogObj)
  })
}

export const addCity = (cityObj) => {
  return fetch(`/api/cities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cityObj)
  })
}

export const editWalker = (id, walkerObj) => {
  return fetch(`/api/walkers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(walkerObj)
  })
}