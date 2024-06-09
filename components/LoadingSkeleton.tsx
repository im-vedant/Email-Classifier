import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const LoadingSkeleton = ({ isClassifying} : {isClassifying : boolean}) => {
  return (
    <div>
      {
        [1,2,3,4,5].map((i)=>{
          return <div className='px-[30px] border-[2px] border-white py-[20px] rounded-md mb-[40px]' >
          < div className="flex flex-row justify-between">
                  
                 <Skeleton height={'50px'} width={'300px'}/>
                 <Skeleton height={'50px'} width={'100px'}/>
                </div> 
                <div className='my-[10px]'>
                <Skeleton height={'30px'} width={'100%'}/>
                </div>
                <div>
                  <Skeleton height={'20px'} width={'100%'} count={2}/>
                </div>
          </div>
        })
      }
    </div>
  )
}

export default LoadingSkeleton