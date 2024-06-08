'use client'
import { useState, useEffect } from "react";

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { changeValue } from '../store/slice';

// Components
import PokemonCard from "@/components/PokemonCard";
import DetailPage from "@/components/DetailPage";

// ApiCalls
import pokemonApi from "@/api/pokemonClass"; 

export default function Home() {
  const defaultState = useSelector(state => state.currentPokemonState.value)  
  const dispatch = useDispatch()
 
  const [pagination, setPagination] = useState({
    page: 0,
    link: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
    nextLink: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    previousLink: "",
    pokemons: []
  });
  
    
  useEffect(() => {
    callForPokemons('firstLoad'); 
  }, []);
  /*
   * firstLoad/next/previous
  */
  const callForPokemons = async(method, onClickPage) => {
    if (pagination.page == onClickPage) {
      return;
    };

    const methods = {
      firstLoad: pagination.link,
      nextLink: pagination.nextLink,
      previousLink: pagination.previousLink
    }

    try {
      const pokemons = 
        await pokemonApi.getAllPokemons(methods[method], onClickPage, pagination.page, method);
      
      let page = pagination.page
      
      if (method == 'previousLink') {
        page = page - 1;
      }

      if (
        method == 'firstLoad' ||
        method == 'nextLink'
      ) {
        page = page + 1;
      }
      
      if (onClickPage) {
        page = onClickPage;
      }

      setPagination({
        page: page,
        nextLink: pokemons.nextLink,
        previousLink: pokemons.previousLink,
        pokemons: pokemons.pokemons
      })

    } catch (e) {
      alert(e)
    }
  } 

  const onChangePokemon = async(pokemon) => {
    try {
      const pokemonData = await pokemonApi.getCharacteristicts(pokemon.id, pokemon.abilities)
      dispatch(changeValue({
        ...pokemon,
        ...pokemonData
      }))
    } catch (e) {
      console.log(e)
    }
  }

  if (defaultState !== null) {
    return <DetailPage pokemon={defaultState} onClose={() => dispatch(changeValue(null))}/>
  };

  const paginationNumber = () => {
    const view = []
    for (let i = 1; i <= 8; i++) {
      const classPaginate = pagination.page == i ? "pagination-link is-current" : "pagination-link" 
      view.push (              
        <li key={"page_"+i}>
          <a
            className={classPaginate}
            aria-label={"Page_"+i}
            aria-current="page"
            onClick={() => callForPokemons("", i)}
          >
            {i}
          </a>
        </li>
      )
    }
    return view
  }

  return (
    <div className="container p-2">
      <div className="columns is-multiline mt-4">
        {
          pagination?.pokemons?.map((item, index) => {
            const pokemon = item.data;
            return (
              <div
                key={pokemon.id}
                className="column is-3"
              >
                <PokemonCard
                  name={pokemon.name}
                  image={pokemon.sprites.front_default}
                  types={pokemon.types}
                  onClick={() => onChangePokemon(pokemon)}
                />
              </div>
            )
          })
        }
      </div>
      <div className="columns">
        <div className="column is-12">
          <nav className="pagination" role="navigation" aria-label="pagination">
            <button 
              className="pagination-previous"
              onClick={() => callForPokemons("previousLink")}
              disabled={pagination.page == 1}
            >
              Previous
            </button>
            <button
              onClick={() => callForPokemons('nextLink')}
              className="pagination-next"
              disabled={pagination.page == 8}
            >
              Next page
            </button>
            <ul className="pagination-list">
              {paginationNumber()}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
