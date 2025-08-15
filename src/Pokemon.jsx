import PokemonCards from "./Pokemoncards";
import React, {useEffect, useState} from "react";
import "./index.css";
function Pokemon(){

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");


    const API="https://pokeapi.co/api/v2/pokemon?limit=152";

    const pokemonData=async () => 
       {
        try{
            const res= await fetch(API);
            const data= await res.json();

            const detailedPokemonData= data.results.map(async(currPokemon)=>{
                const res= await fetch(currPokemon.url);
                const data= await res.json();
                return data;
            });

            const detailedResponses = await Promise.all(detailedPokemonData);
            console.log(detailedResponses);
            setPokemon(detailedResponses);
            setLoading(false);

        }catch(error){
            console.log(error);
            setError(error);
            setLoading(false);
        }
       }
       useEffect(() => {
            pokemonData();
        }, []);
        useEffect(()=>{
          document.title="Pokemon cards";
        })

    const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
}
  return (
    <>
      <section className="container">
        <header>
          <h1> Lets Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
            {searchData.map((curPokemon) => {
              return (
                <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
export default Pokemon;