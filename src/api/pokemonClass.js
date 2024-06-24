import axios from "axios";

class PokemonApiClass {
  async getAllPokemons(link, onClickPage, page, method) {
    try {
      let localLink = link;
      if (onClickPage) {
        const currentPage = onClickPage - 1;
        localLink = `https://pokeapi.co/api/v2/pokemon?offset=${currentPage * 20}&limit=20`;
      }
      const { data: pokemons } = await axios.get(localLink);

      if (onClickPage == 8 || (page == 7 && method == "nextLink")) {
        pokemons.results = pokemons.results.slice(0, 11);
      }

      const pokemonData = await Promise.all(
        pokemons.results.map(pokemon => axios.get(pokemon.url))
      );

      const cleanData = pokemonData.map(({ data }) => data);

      return {
        count: pokemons.count,
        nextLink: pokemons.next,
        previousLink: pokemons.previous,
        pokemons: cleanData,
      };

    } catch (e) {
      console.error(e);
      throw new Error("Error fetching Pokemon data");
    }
  }

  async getCharacteristicts(id, abilityArr) {
    try {
      const detailData = await Promise.all(
        abilityArr.map(({ ability }) => axios.get(ability.url))
      );

      const cleanData = detailData.map(({ data }) => data);

      return { abilities: cleanData };

    } catch (e) {
      console.error(e);
      throw new Error("Error fetching Pokemon characteristics");
    }
  }

  asignateColorToType(type) {
    const typeColors = {
      fire: '#E72324',
      water: '#2881F0',
      bug: '#92A312',
      grass: '#3DA324',
      normal: '#9FA19F',
      psychic: '#EF4179',
      fairy: '#EF71EF',
      rock: '#AFA981',
      ghost: '#704170',
      dragon: '#5061E1',
      steel: '#60A3BA',
      electric: '#FAC000',
      ice: '#3FD8FF',
      fighting: '#F98100',
      dark: '#50413F',
      ground: '#92501C',
      poison: '#933FCC',
      flying: '#81B9EF',
    };

    return typeColors[type] || 'black';
  }
}

const pokemonApi = new PokemonApiClass();
export default pokemonApi;
