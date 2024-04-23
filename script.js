const pokeAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const infoName = document.getElementById("pokemon-name");
const infoId = document.getElementById("pokemon-id");
const infoWeight = document.getElementById("weight");
const infoHeight = document.getElementById("height");
const infoImageDiv = document.getElementById("image");
const infoTypesDiv = document.getElementById("types");

const stats = [
    ["hp", document.getElementById("hp")],
    ["attack", document.getElementById("attack")],
    ["defense", document.getElementById("defense")],
    ["special-attack", document.getElementById("special-attack")],
    ["special-defense", document.getElementById("special-defense")],
    ["speed", document.getElementById("speed")]
];

const screenDisplay = document.getElementById("screen-display");

const setScreenStateOn = (turnOn) => {
    if (turnOn) {
        screenDisplay.style.backgroundColor = `white`;
    }
    else {
        screenDisplay.style.backgroundColor = `var(--black)`;
    }
}

const clearEntry = () => {
    infoName.innerText = "";
    infoId.innerText = "";
    infoWeight.innerText = "";
    infoHeight.innerText = "";

    stats.forEach((stat) => {
        stat[1].innerText = "";
    });

    infoImageDiv.innerHTML = "";
    infoTypesDiv.innerHTML = "";
}

const fetchPokemonEntry = async (pokemon) => {
    setScreenStateOn(false);
    clearEntry();

    try {
        const res = await fetch(`${pokeAPI}/${pokemon}/`);
        const data = await res.json();

        //update information
        infoName.innerText = data.name;
        infoId.innerText = data.id;
        infoWeight.innerText = data.weight;
        infoHeight.innerText = data.height;

        //update stats
        stats.forEach((stat) => {
            stat[1].innerText = data.stats.find((element) => element.stat.name === stat[0]).base_stat;
        });

        //update image
        infoImageDiv.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" />`;

        //update types
        infoTypesDiv.innerHTML = data.types.map((type) => {
            return `
        <span class="type ${type.type.name}">${type.type.name.toUpperCase()}</span>
      `;
        }).join("");

        setScreenStateOn(true);
    } catch (err) {
        setScreenStateOn(false);
        alert("Pokémon not found");
    }
};

const searchBtnClick = () => {
    const pokemonEntry = searchInput.value.replace(/[\s]/g, "").replace(/[.,]/g, "-").toLowerCase();
    console.log(pokemonEntry);
    fetchPokemonEntry(pokemonEntry);
}

const keyPress = (key) => {
    if (key.key == "Enter") {
        searchBtnClick();
    }
}

searchBtn.addEventListener("click", searchBtnClick);
searchInput.addEventListener("keypress", keyPress);