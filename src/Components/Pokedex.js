import React, { Component } from 'react';
import Axios from 'axios';

class Pokedex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonName: 'pikachu',
            pokemonImg: ''
        };
    }

    async componentDidMount() {
        try {
            const response = await Axios.get(
                `https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName.toLowerCase()}`
            );
            if (response.data.sprites) {
                this.setState({
                    pokemonImg: response.data.sprites.front_default
                });
            }
        } catch (err) {
            console.log(err);
            this.setState({ pokemonName: '' });
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        try {
            if (
                this.state.pokemonName === '' ||
                prevState.pokemonName === this.state.pokemonName
            ) {
                return;
            }
            const response = await Axios.get(
                `https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName.toLowerCase()}`
            );
            if (response.data.sprites) {
                this.setState({
                    pokemonImg: response.data.sprites.front_default
                });
            }
        } catch (err) {
            console.log(err);
            this.setState({ pokemonName: '' });
        }
    }

    render() {
        return (
            <div>
                <h1> Fischer-Price My First Pokedex</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.setState({ pokemonName: e.target[0].value });
                    }}>
                    <input type="text" placeholder={this.state.pokemonName} />
                    <input type="submit" value="GO" />
                </form>
                <img src={this.state.pokemonImg} alt="pokemon img" />
            </div>
        );
    }
}

export default Pokedex;
