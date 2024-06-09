import SignOut from '@/components/SignOut'
import { authOptions } from '../auth/AuthOptions'
import { getServerSession } from 'next-auth'
import Emails from '../../components/Emails'
const page = async() => {
  
  const session=await getServerSession(authOptions)//fetching the session 
  if (session)
    return (
      <section >
       
        <div className='max-w-[1400px] text-white bg-black px-[200px] my-11 mx-auto'>
          <div className='flex flex-row mb-[50px] items-center justify-between'>
            <div className='flex  flex-row items-center space-x-4'>
              <img src={session?.user?.image!} alt="" className='w-[80px] rounded-full' />
              <div>
                <h2 className='text-4xl'>{session?.user?.name}</h2>
                <h3 className='text-[20px]'>{session?.user?.email}</h3>
              </div>
            </div>
            <div>
              <SignOut />
            </div>
          </div>

          <div>
            {/* This component displays the list of emails */}
           <Emails session={session}/>
            
          </div> 

        </div>
      </section>
    )
}

export default page