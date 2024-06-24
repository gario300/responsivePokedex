import React from 'react';
import PropTypes from 'prop-types';
import pokemonApi from "@/api/pokemonClass";

const PokemonCard = React.memo(({ name, image, types, onClick }) => {
  return (
    <article className="media cardPokemon" onClick={onClick}>
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={image} alt={`${name}_image`} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{name}</strong>
            <br />
            {types.map((type, index) => (
              <span
                key={`type_${type.type.name}_${index}`}
                className="tag mx-1"
                style={{
                  backgroundColor: pokemonApi.asignateColorToType(type.type.name),
                  color: 'white',
                }}
              >
                {type.type.name}
              </span>
            ))}
          </p>
        </div>
      </div>
    </article>
  );
});

PokemonCard.displayName = 'PokemonCard';

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PokemonCard;
