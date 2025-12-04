import { useState, useEffect } from "react";
import { fetchPokemons } from "../../api";
import Cardgrid from "./Cardgrid";




export default function Body() {

    const [pokemonList, setPokemonList] = useState([])
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    const [clicked, setClicked] = useState([])
    const [isStart, setIsStart] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false)


    useEffect(() => {
        fetchPokemons().then((pokemon) => {
            setPokemonList(pokemon)
        })
    },[])

    function startAgain() {
        setScore(0)
        setClicked([])
    }


    return (
        <>
        <div className="main-content">
            
            <Modal
            isStart={isStart}
            setIsStart={setIsStart}
             />
             < Restartmodal 
             score={score}
             isGameOver={isGameOver}
             setIsGameOver={setIsGameOver}
             setIsStart={setIsStart}
             setScore={setScore}
             />
            <div className="head-content">
            {isStart ? (
                <div>
                    <p>Score: {score}</p>
                    <p>Best Score: {bestScore}</p>
                </div>
            ) : "" }
            

                <div className={score===20 ? "high-score" : "high-score-hide"}>
                    <p>Good Job! You got them all!</p>
                    <button onClick={() => startAgain()}>Play Again!</button>
                </div>
            </div>
    
            <Cardgrid 
                pokemonList={pokemonList}
                setPokemonList={setPokemonList}
                clicked={clicked}
                setClicked={setClicked}
                score={score}
                setScore={setScore}
                setBestScore={setBestScore}
                isStart={isStart}
                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}
            />
         </div>
        </>
    )
}


function Modal({isStart, setIsStart}) {

    function handleStart() {
        setIsStart(true)
        console.log('starting')
    }

    return (
        <div className={!isStart ? "modal" : "modal-hide"}>
                <h1>Welcome to Memory Game</h1>
                <p>Select pokemon but do not click the same one.</p>
                <button onClick={() => handleStart()} className="start">Let's Go!</button>
            </div>
    )
}


function Restartmodal({score, isGameOver, setIsGameOver, setIsStart, setScore}) {

    function handleRestart() {
       setIsGameOver(false)
       setIsStart(true)
       setScore(0)
    }

    return (
        <div className={isGameOver ? "restart-modal" : "restart-modal-hide"}>
                <h1>Game Over!</h1>
                <p>Your Score is {score}</p>
                <button onClick={() => handleRestart()} className="start">Restart Game</button>
            </div>
    )
}