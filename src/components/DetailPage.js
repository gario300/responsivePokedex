import React, {useState, useEffect} from "react"
import pokemonApi from "@/api/pokemonClass"
function DetailPage({pokemon, onClose}){

  const typeColor = (color) => {
    switch (expression) {
      case 'fire':
        return ''
        
        break;
      
      default:
    }
  }
  return(
    <div className="container p-2">
      <div className="columns is-centered mt-4">
        <div className="column is-6">
          <button
            className="button is-danger is-ghost is-fullwidth"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-6">
          <div className="card">
            <div className="card-image">
              <figure className="image is-1by1">
                <img
                  src={pokemon?.sprites?.front_default}
                  alt={pokemon.name}
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img
                      src={pokemon.sprites.back_default}
                      alt={pokemon.name+"_back"}
                    />
                  </figure>
                </div>
              <div className="media-content">
                  <p className="title is-4">{pokemon.name}</p>
                  {
                    pokemon.types.map((type, index) => {
                      return (
                        <span
                          key={"type_"+type.type.name+"_"+index}
                          className="tag mr-1"
                          style={{
                            backgroundColor: pokemonApi.asignateColorToType(type.type.name),
                            color: 'white'
                          }}
                        >
                          {type.type.name}
                        </span>
                      )
                    })
                  }
                </div>
              </div>
              <div className="content">
                <br/>
                <p className="title is-5 my-3">
                  Abilities
                </p>
                {
                  pokemon.abilities.map((ability, index) => {
                    return (
                      <p key={"ability_"+ability.data.id+"_"+index}>
                        <strong>{ability.data.name}</strong>
                        <br/>
                        {ability.data.effect_entries[1].effect}
                      </p>
                    )
                  })
                }
                <br/>
                <p className="title is-5 my-3">
                  Shiny
                </p>
                <figure className="image is-128x128">
                  <img src={pokemon.sprites.front_shiny} />
                </figure>
                <figure className="image is-128x128">
                  <img src={pokemon.sprites.back_shiny} />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
