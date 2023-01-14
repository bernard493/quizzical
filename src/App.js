import './App.css';
import React from 'react';
import {Home , Questions} from './Components/index'

/**
 * when user start 
 * we should get questions from api into  questions state the pass them down to the questions components 
 */

function App() {
  const [start ,setStart] = React.useState(false)
  




   {/** Starts the Quiz */}
  const  startQuiz = () => {
    setStart(prev => !prev)
  }
   
  {/** Ends the Quiz */}
  function endGame(){
    setStart(prev => !prev)
  }
  

  return (
    // render home if quiz theres no quiz id there is quiz render questions
    <div className="App">
      
      {
       start ?
       <Questions 
       start={start}
       endGame={endGame}
       />
        :
        <Home 
       
        startQuiz={startQuiz}
        
        />

      }
    </div>
  );
}

export default App;
