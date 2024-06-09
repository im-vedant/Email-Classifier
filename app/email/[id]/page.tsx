'use client'
import React from 'react'
type Params={
  id : string
}
const page = ({params}:{params : Params}) => {
    if(localStorage.getItem('email')===null){
      return <div className='text-white text-2xl'>Unable to retrieve email</div>
    }
    let email
    if(localStorage.getItem('email')!==null){
      email=JSON.parse(localStorage.getItem('email')!)[params.id]//getting the email from local storage
    }
     
    
  return (
    <section className='max-w-[1400px] text-white  bg-black px-[200px] my-11 mx-auto'>
      <div className='border-[2px] rounded-md border-white p-6'>
      <div className='text-[24px] flex flex-row justify-between mb-3'>
       <p>
       {
          email?.sender
        }
       </p>
       <p>
        {
          email?.classification
        }
       </p>
      </div>
      <div className='mb-3'>
        {
          email?.subject
        }
      </div>
      {/* 
      The content of the email is displayed using dangerouslySetInnerHTML because it is html content
       */}
      <pre className='text-wrap' dangerouslySetInnerHTML={{__html:email?.content}}>

      </pre>
      </div>
    </section>
  )
}

export default page