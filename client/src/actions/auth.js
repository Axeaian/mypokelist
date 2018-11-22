export async function login(username, password) {
  const response = await fetch("/user/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });
  const data = await response.json();
  return data;
}

export async function signup(username, password, dob, country, email) {
  const response = await fetch("/user/signup", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      dob: dob,
      country: country,
      email: email
    })
  });
  const data = await response.json();
  return data;
}

export async function getFav(pokemon) {
  const response = await fetch("/user/fav", {
    method: "get",
    headers: { "Content-Type": "application/json" }
  });
  const data = await response.json();
  return data;
}

export async function fav(pokemon) {
  const response = await fetch("/user/fav", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pokemon: pokemon
    })
  });
  const data = await response.json();
  return data;
}