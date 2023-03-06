import React from 'react'

const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : 'white'
    }

    return (
        <div onClick={props.holdDice} style={styles} className='die'><span className='die-num'>{props.value}</span></div>
    )
}

export default Die