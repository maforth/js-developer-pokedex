const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const cards = document.querySelectorAll(".pokemon");
const maxRecords = 151;
const limit = 10;
let todosPokemons = [];
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `;
}
const modal = document.querySelector(".modal");
const fundoModal = document.querySelector(".container-modal");
const botaoFechar = document.querySelector(".btn-fechar");
cards.forEach((item) => {
  item.addEventListener("click", () => {
    item.style.backgroundColor = "red";
  });
});
function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
    todosPokemons.push(...pokemons);
    const cards = document.querySelectorAll(".pokemon");
    cards.forEach((item) => {
      item.addEventListener("click", () => {
        const name = item.querySelector(".name");
        let card = todosPokemons.filter((obj) => obj.name === name.textContent);
        card = card[0];
        const types = [
          "bug",
          "grass",
          "fire",
          "normal",
          "water",
          "electric",
          "ice",
          "ground",
          "flying",
          "poison",
          "fighting",
          "psychic",
          "dark",
          "rock",
          "ghost",
          "steel",
          "dragon",
          "fairy",
        ];
        types.forEach((type) => modal.classList.remove(type));
        modal.classList.add(`${card.type}`);
        modal.innerHTML = `<h2>${card.name}</h2>
      <ol class="types">
        ${card.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
      </ol>
      <img
        src="${card.photo}"
      class="img-detail"/>
      <div class="infos">
        <p class="info">Espécie: <span class="especie detalhe">${
          card.specie.name
        }</span></p>
        <p class="info">Habilidades: ${card.abilities
          .map((ability) => `<span class="hablidade detalhe">${ability}</span>`)
          .join(", ")}.</p>
        <button class="btn-fechar">Fechar</button>
      </div>`;
        modal.style.display = "block";
        fundoModal.style.display = "block";

        // Adicione o evento de clique ao botão de fechar aqui
        const botaoFechar = document.querySelector(".btn-fechar");
        botaoFechar.addEventListener("click", () => {
          modal.style.display = "none";
          fundoModal.style.display = "none";
        });
      });
      [fundoModal].forEach((el) => {
        el.addEventListener("click", () => {
          modal.style.display = "none";
          fundoModal.style.display = "none";
        });
      });
    });
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
