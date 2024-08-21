// aca obtengo los pokemones y con  el fetchdata cargo los primeros 20 en la lista
import React, { useState, useEffect } from 'react';
import { fetchData } from '../apiService';
import '../Component.css';

function APIComponent() {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    if (loading) {
      fetchAPI();
    }
  }, [loading]);

  async function fetchAPI() {
    try {
      const apiData = await fetchData('pokemon?limit=20');
      getPokemon(apiData.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

    const getPokemon = async (data) => {
      const newPokemons = [];
      let contador = 0;
    
      for (let index = 0; index < data.length; index++) {
        const pokemonName = data[index].name;
        const poke = await fetchData(`pokemon/${pokemonName}/ `);
        contador++;
        
        newPokemons.push({
          idPokemon: index, 
          pokemonName: pokemonName,
          imgUrl: poke.sprites.front_default,
          
          
        });
      }
      console.log(contador);
      setPokemons(previous => [...previous, ...newPokemons]);
    };
 
  if (loading) return <p>Calgando...</p>;
  if (error) return <p>Elol: {error.message}</p>;
 
  return (
    <div className='content'>
      <h2>Lista de Pokemanes</h2>
      <div className='listPkms'>
        <div className='pokemon'>
          
            {pokemons.map((pokemon, index) => (
              
              <div className='card' key={index}>
                <div className='front'> 
                  <img src={pokemon.imgUrl} alt={pokemon.pokemonName} />  {pokemon.pokemonName}
                </div>
                <div className='back'> 

                </div>
              </div>
            ))}
          
        </div>
      </div>
    </div>
  );
}

export default APIComponent;
