import React from 'react'
import {nanoid} from "nanoid"
import {Quiz} from '../Quiz/Quiz'
import LoadingImg from '../img/jelly-monster-running-on-loading-bar.gif'

export const Questions = (props) => {
  const [questions,setQuestions] = React.useState([])
  const [results ,setResults] = React.useState(0)
  const [checkCorrectAnswer , setCheckCorrectAnswer] = React.useState(false)
  const [restart,setRestart] = React.useState(false)
  const [getNewQuestions,setGetNewQuestions] = React.useState(false)
 

  


  {/** Sort the Answer Array */}
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }



 {/** Api call to get Questions from Open Trivia Database */}
 React.useEffect(() => {
  if(props.start){
    async function fetchData() {
  const url = "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple";
  const res = await  fetch(url)
    const data = await res.json()
   setQuestions(prevQuestion =>  data.results.map((question , i) => {
      return{
        ...question,
        answers : shuffle([
          {
          answer : question.correct_answer,
          isCorrect : true,
          isSelected : false,
          id : nanoid() 
          },
        ].concat(question.incorrect_answers.map(answer=> {
         return {
            answer : answer,
            isCorrect : false,
            isSelected : false,
            id : nanoid()
          }
        }))),
        key : nanoid(),
        id : i + 1 
      
      }
    }))
    .catch(error => console.error(error))
 }

fetchData();
  }
},[getNewQuestions])




{/**  Update Answers of the Questions the User Picked   */}
function saveAnswers(e,index,id){
  const answerId = index;
  const questionId = id ;
  setQuestions(prevQuestion => prevQuestion.map( question => {
    return questionId === question.id ?
     {
       ...question,
       answers: question.answers.map((answer,index) => {
      return   index === answerId ?
         {
           ...answer,
           isSelected : !answer.isSelected
         }
         :
         {
          ...answer,
          isSelected : false
        }
       } )

     }:
     question

   }))

  
}


 

{/**  Display final results  */}
 const checkResult = (event) => {
  {/** Check if user picked answer from each question */}
   const allQuestionAnswered = questions.every(question => {
   return question.answers.some(answer => {
      if(answer.isSelected){
         return true
      }
    })
   })
    if(allQuestionAnswered){
          setCheckCorrectAnswer(prev => !prev);
          questions.map(question => {
          question.answers.map(answer => {
            if( answer.isSelected && answer.isCorrect){
              return  setResults(prevResult => prevResult += 5)
            }else if(answer.isSelected && !answer.isCorrect ){
                return  setResults(prevResult => prevResult)
            }
          

          })
        }
          
        )
        setRestart(prev => !prev)
    }else{
      alert('Kindly Answer all Questions')
    }  
   
}



function reStartGame(){
  setGetNewQuestions(prev => !prev)
  setQuestions(prevQuestion => [])
  setCheckCorrectAnswer(false)
  setResults(0)
  setRestart(false)
 
}






{ /** rendering questions using the map  FUNC*/}
 const question = questions.map((question) => 
 <Quiz 
      question ={question.question} 
      answers ={question.answers}
      id={question.id}
      key={question.key}
      saveAnswers={saveAnswers}
      checkCorrectAnswer={checkCorrectAnswer}


   />)

  
  return (
    <div className=' bg-[#F5F7FB]'>
      {questions.length == 0? 
         <div className='grid h-screen justify-center items-center'>
            <div  className='p-[5rem] item'>
              <img src={LoadingImg} alt="" />
            
            </div> 
        </div> 
        :<div>
          <div  className='px-[1rem] py-[2rem] md:p-[5rem]'>
          {question}
          </div> 
      </div> 







      }{questions.length != 0 &&
      <div className='flex flex-col  items-center  px-[5rem]  md:grid grid-cols-2 justify-center  pb-[6rem] '>
        <div className='py-[2rem]'>
            <p className='text-2xl font-sans font-bold'>You Scored : {results}</p>
        </div>
        <div className='space-y-5 md:flex md:space-x-6'>
            { restart? 
            <button className='cursor-pointer text-sm font-semibold  text-white	w-60 max-w-xl rounded-md bg-[blue] p-3  ring-2 ring-transparent transition-all  hover:shadow checked:text-sky-600 checked:ring-blue-400 checked:ring-offset-2'
            onClick={reStartGame}>
                  Play Again
            </button>:
            <button className='cursor-pointer text-sm font-semibold  text-white	w-60 max-w-xl rounded-md bg-[blue] p-3  ring-2 ring-transparent transition-all  hover:shadow checked:text-sky-600 checked:ring-blue-400 checked:ring-offset-2'
            onClick={checkResult}>
                Check Answers
          </button>

            }
              
              <button className='cursor-pointer text-sm font-semibold  text-white	w-60 max-w-xl rounded-md bg-[red] p-3  ring-2 ring-transparent transition-all  hover:shadow checked:text-sky-600 checked:ring-blue-400 checked:ring-offset-2'
            onClick={props.endGame}>
                End Game 
          </button>
        </div>
       
      </div>   }
    </div>
  )
}
