// apiClass gestionaria los errores que son del servidor
import axios from "axios"
import {resolve} from "styled-jsx/css";
/*
 * Gestiona los llamados al servidor
 * o los metodos relacionados a los pokemon
*/
class pokemonApiClass {
  getAllPokemons(link, onClickPage, page, method) {
    return new Promise(async (resolve, reject) => {
      try {
        let localLink = link;
        if (onClickPage) { 
          const currentPage = onClickPage - 1
          localLink = 
            `https://pokeapi.co/api/v2/pokemon?offset=${currentPage * 20}&limit=20`
        }
        let pokemons = await axios.get(localLink);
        pokemons = pokemons.data;
        if (
          onClickPage == 8 ||
          page == 7 && method == "nextLink"
        ) {
          pokemons.results = pokemons.results.splice(0, 11)
        }
        const arrToResolve = [];
        
        for (const pokemon of pokemons.results) {
          arrToResolve.push(axios.get(pokemon.url));
        }

        const pokemonData = await Promise.all(arrToResolve);
        resolve({
          count: pokemons.count,
          nextLink: pokemons.next,
          previousLink: pokemons.previous,
          pokemons: pokemonData,
        })

      } catch (e) {
        console.log(e)
         reject("Este es un error")
      }
    })
  }
  getCharacteristicts(id, habilityArr) {
    return new Promise(async(resolve, reject) => {
      try {
        const arrDetails = [];
        for (const hability of habilityArr) {
          arrDetails.push(axios.get(hability.ability.url));
        };
        let finalObj = {}
        let detailData = await Promise.all(arrDetails);
        finalObj.abilities = detailData;
        resolve(finalObj)
      } catch (e) {
        reject(e)
      }
    })
  }
  asignateColorToType(type){
    /*
     * Esto pudo ser un objeto y usarlo por un enum pero escogí
     * switch por si se me olvidaba algun tipo o lo escribía mal
     * retorne el default
    */
    switch (type) {
      case 'fire':
        return '#E72324' 
      case 'water':
        return '#2881F0'
      case 'bug':
        return '#92A312'
      case 'grass':
        return '#3DA324'
      case 'normal': 
        return '#9FA19F'
      case 'psychic':
        return '#EF4179'
      case 'fairy':
        return '#EF71EF'
      case 'rock':
        return '#AFA981'
      case 'ghost':
        return '#704170'
      case 'dragon':
        return '#5061E1'
      case 'steel':
        return '#60A3BA'
      case 'electric':
        return '#FAC000'
      case 'ice':
        return '#3FD8FF'
      case 'fighting':
        return '#F98100'
      case 'dark':
        return '#50413F'
      case 'ground':
        return '#92501C'
      case 'poison':
        return '#933FCC'
      case 'flying':
        return '#81B9EF'
      default:
        return 'black'
    }
  }
}

const pokemonApi = new pokemonApiClass();
export default pokemonApi;
