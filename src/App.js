import './App.css'
import React, {useState} from 'react';
import {Slider,Button} from '@mui/material';



const initMoles = (numberOfMoles)=> {
  return (new Array(numberOfMoles)).fill(0,0,numberOfMoles);
}

function App() {

  const [numberOfMoles,setNumberOfMoles]=useState(5);
  const [moles,setMoles]=useState(initMoles(numberOfMoles));
  const [start,setStart]=useState(false);
  const [active,setActive]=useState(-1);
  const [timer,setTimer]=useState(null);
  const [score,setScore]=useState(0);
  const [gameState,setGameState]=useState('stopped');
  const [clicked,setClicked]=useState([]);


  const onSetActive = (index)=> {
    setActive(index);
  }

  const animate = (timeout)=> {
    const randIndex=Math.floor(Math.random()*numberOfMoles);
    onSetActive(randIndex);
    setClicked([]);
    const timer = setTimeout(() => animate(timeout), timeout);
    setTimer(timer);
  }

  const onSetMoles= ()=> {
    const newMoles=initMoles(numberOfMoles);
    setMoles(newMoles);
  }


  const onChangeNumberOfMoles= (num)=> {
    
    setNumberOfMoles(num);
    const newMoles=initMoles(num);
    setMoles(newMoles)
  }

  const onStart = ()=> {
    setStart(true);
    onSetMoles();
    setScore(0);
    animate(1000);
    setGameState('running');
  }

  const onStop = (reason)=> {
    setStart(false);
    clearTimeout(timer);
    setTimer(null);
    setGameState(reason);
  }

  const onMoleClick = (index)=> {
    if(start && !clicked.includes(index)) {
      setClicked([...clicked,index]);
      const newScore=score+(active===index?1:-1);
      setScore(newScore);
      if(newScore===5) {
        onStop('won');
      }
      else if(newScore<0){
        onStop('lost');
      }  
    }
  }


  
  const Moles= moles.map((mole,index)=> (<Mole key={`mole${index}`} index={index} active={active===index}  clicked={clicked.includes(index)} onMoleClick={onMoleClick}
  />));

  const showGameState = ()=> {
    if(gameState==='won') {
      return <div className='wonState'><h2>Congratulations !!! You won the game</h2>
      <img src={'congrats.gif'} /></div>
    }
    if(gameState==='lost') {
      return <div className='lostState'><h2>Sorry !! You lost the game</h2></div>
    }
    if(gameState==='running') {
       return <h2>Keep playing, enjoy the game</h2>
    }
    return <div className='start'><h2>Click on start to start a new game</h2></div>
  }



  return (
  <div className="root">
    <div className="main">
      <h1>Whack A mole !</h1>
      <div className="settings">
        <span>Number of moles</span>
         <Slider
        defaultValue={5}
        aria-label="Number of moles"
        valueLabelDisplay="auto"
        min={3}
        max={20}
        onChange={(e,val)=>{
          onChangeNumberOfMoles(val)
        }}
        disabled={start}
      />
      </div>
      <div className="score"><b>Score : {score}</b> </div>
     <Button color={start?'error':'primary'} className="btn" onClick={start?onStop:onStart} variant="contained">{start?'Stop':'Start'}</Button>
      <div className="moles">{Moles}</div>
      {showGameState(gameState)}
    </div>
    
  </div>
  );
}

export default App;


const Mole = ({index,active,clicked,onMoleClick})=> {
  return <div  className={`mole ${active?'activeMole':''} ${clicked && (active?'activeClicked':'inactiveClicked')}`} onClick={()=>onMoleClick(index)}>
  </div>;
}
