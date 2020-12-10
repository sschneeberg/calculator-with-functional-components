import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function Pokedex() {
    const [pokemonName, setPokemonName] = useState('pikachu');
    const [pokemonImg, setPokemonimg] = useState('');

    useEffect(() => {
        //unlike component did update this is not an infinite loop
        if (pokemonName === '') {
            return;
        }
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((response) => {
                setPokemonimg(response.data.sprites.front_default);
            })
            .catch((err) => {
                console.log(err);
                setPokemonName('');
            });
    });

    return (
        <div>
            <h1>Fischer-Price My Second Pokedex</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setPokemonName(e.target[0].value);
                }}>
                <input type="text" placeholder={pokemonName} />
                <input type="submit" value="go" />
            </form>
            <img src={pokemonImg} alt={pokemonName} />
        </div>
    );
}

export default Pokedex;
