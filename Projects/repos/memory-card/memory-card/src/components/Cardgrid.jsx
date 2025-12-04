import { useEffect, useState } from "react";
import Card from "./Card";



export default function Cardgrid({pokemonList, setPokemonList, clicked, setClicked, score, setScore, setBestScore, isStart, isGameOver, setIsGameOver}) {
   
    
    const [cards, setCards] = useState([])

    useEffect(() => {
        setCards(
            pokemonList.map((pokemon) =>(
                <Card
                    key={pokemon.name}
                    pokemonName = {pokemon.name}
                    pokemonImg = {pokemon.img}
                    pokemonList={pokemonList}
                    setPokemonList={setPokemonList}
                    clicked={clicked}
                    setClicked={setClicked}
                    score={score}
                    setScore={setScore}
                    setBestScore={setBestScore}
                    setIsGameOver={setIsGameOver}
                />
            ))
        )
        console.log('Cards Rendering')
    }, [pokemonList])

        return(
            <div className={!isStart || isGameOver ? "card-grid-hidden" : "card-grid"}>
                {cards}
            </div>
        )

}