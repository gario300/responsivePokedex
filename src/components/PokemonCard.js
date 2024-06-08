import React, {useState, useEffect} from "react"
import pokemonApi from "@/api/pokemonClass"
function PokemonCard({name, image, types, onClick}){
  return(
    <article className="media cardPokemon" onClick={onClick}>
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={image} alt={name+"_image"} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{name}</strong>
            <br />
            {
              types.map((type, index) => {
                return (
                  <span
                    key={"type_"+type.name+"_"+index}
                    className="tag mx-1"
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
          </p> 
        </div>
      </div>
    </article>
  )
}

export default PokemonCard
