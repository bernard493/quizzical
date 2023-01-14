import React from 'react'

export const Quiz = (props) => {

{/** Styles to Apply to selected answers */}
  const selectedStyle ={
    backgroundColor:  '#D6DBF5' ,
    
  }

  const  correctAnswerStyle ={
       backgroundColor : '#94D7A2'
  }

  const  wrongAnswerStyle ={
    backgroundColor : '#F8BCBC'
    
}




 
  return (
    <div className='py-[1rem] border-b-4' key={props.id}>
            <h1 className='text-md   md:text-2xl font-sans font-bold'>{props.id}. {props.question}</h1>
             <div className='flex flex-col items-center  space-y-2 pt-[2rem]  md:flex md:flex-row  space-x-2'>
              
                    {
                    props.answers.map((answer,index) => {

                      const  styles = ()=>{
                       
                      if (props.checkCorrectAnswer) {
                        if(answer.isSelected && answer.isCorrect){
                          return correctAnswerStyle
                        }else if(answer.isSelected && !answer.isCorrect){
                                return wrongAnswerStyle
                        }else if( !answer.isSelected && answer.isCorrect ){
                               return correctAnswerStyle
                        }
                      }else if(answer.isSelected){
                        return selectedStyle
                      }

                      
                    }
                    
                       return (
                      
                        
                        <button key={answer.id} id={index} className='  cursor-pointer border-4 text-[0.8rem] font-semibold  text-gray-600	w-60 max-w-xl rounded-md bg-white p-3 text-gray-600 ring-2 ring-transparent transition-all flex justify-center hover:shadow  md:text-sm '
                           style={styles()} 
                           onClick={(e)=>props.saveAnswers(e,index,props.id)}>
                             {answer.answer} 
                          </button>
                      
                         
                      
                         
                       )
         })
                   
                   }
                
                      
                    
                     
            </div>
                
    </div> 
  )
 
}
