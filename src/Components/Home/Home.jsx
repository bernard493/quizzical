import React from 'react'
import './Home.css'

export const Home = (props) => {
   
  return (
   

    <div className='relative w-screen h-screen bg-[#F5F7FB]'>
      <div className=" flex justify-end  "> 
        
      </div>
     
      <div  className='pt-[20rem]   '>
        <div className=""> 
            <h1 className='font-bold text-4xl py-[1rem] flex justify-center '>Quizzical</h1>
            <p className=' flex justify-center '>Some description if needed</p>
              <div className="flex justify-center  py-[1rem]">
                <button onClick={props.startQuiz} className='h-[3rem] rounded-md text-[#fff] text-xl font-cold w-[10rem] bg-[#4D5B9E] '>Start quiz</button>
              </div>
        </div>  
      </div>
      
    </div>
  )
}
