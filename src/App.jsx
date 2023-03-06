import React, { useState, useEffect } from 'react'
import './index.css'
import Die from './Die'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

const App = () => {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeldEqual = dice.every(die =>
      die.value === dice[0].value && die.isHeld
    )

    if (allHeldEqual) {
      setTenzies(true)
      console.log("YOU WON!")
    }
  }, [dice])


  function allNewDice() {
    const diceArray = []
    for (let i = 0; i < 10; i++) {

      diceArray.push(
        generateNewDie()
      )
    }
    return diceArray
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function getNewDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }
    else {
      setDice(allNewDice())
      setTenzies(false)
    }
  }

  function holdDice(id) {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id === id ?
          { ...die, isHeld: !die.isHeld } :
          die
      })
    })
  }


  const diceElements = dice.map((die) => {
    return <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  })



  return (
    <div className='main'>
      {tenzies && <Confetti />}
      <div className='title'><h1>Tenzies</h1></div>
      <p>Roll until all dice are the same.
        Click each die to freeze
        it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <div className='roll'>
        <button onClick={getNewDice}>{tenzies ? "New Game" : "Roll"}</button>
      </div>
    </div>
  )
}

export default App

