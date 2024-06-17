const BASE_URL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

/*Form Elements */
const input = document.getElementById("search-input");
const btn = document.getElementById("search-button");
const types = document.getElementById("types");
/*Name, Id, height, weight */
const pokemon_name = document.getElementById("pokemon-name");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const image = document.getElementById("sprite");
const id = document.getElementById("pokemon-id");
/* statitics */
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defence = document.getElementById("defense");
const special_attack = document.getElementById("special-attack");
const special_defense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

btn.addEventListener("click", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const value = input.value;

  if (input.value.trim() === "") {
    alert("There must be a value");
    return "There must be a value";
  }

  if (input.value === "Red") {
    alert("Pokémon not found");
    return "Pokémon not found";
  }

  if (!isNaN(value)) {
    fetchData(value);
  } else {
    fetchData(value.toLowerCase());
  }
}

async function fetchData(value) {
  try {
    const response = await fetch(`${BASE_URL}/${value}`);
    console.log(response.status);
    const data = await response.json();
    if (Object.keys(data).length > 0) {
      render_info(data);
    }
  } catch (error) {
    console.log(error);
    render_error();
  }
}

function render_info(data) {
  // console.log(data)
  /*Name, Id, height, weight */
  pokemon_name.innerText = `${data.name.toUpperCase()}#${data.id}`;
  id.innerText = `ID: ${data.id}`;
  height.innerText = `Height: ${data.height}`;
  weight.innerText = `Weight: ${data.weight}`;
  image.src = `${data.sprites.front_default}`;
  image.style.display = "block";

  /* statitics */
  hp.innerText = `${data.stats[0].base_stat}`;
  attack.innerText = `${data.stats[1].base_stat}`;
  defence.innerText = `${data.stats[2].base_stat}`;
  special_attack.innerText = `${data.stats[3].base_stat}`;
  special_defense.innerText = `${data.stats[4].base_stat}`;
  speed.innerText = `${data.stats[5].base_stat}`;

  let result = ``;
  data.types.forEach((type) => {
    result += `<button class="btn">${type.type.name}</button>`;
  });
  types.innerHTML = result;
}

function render_error() {
  alert("Pokémon not found");
  return "Pokémon not found";
}
