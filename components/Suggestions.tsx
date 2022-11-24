import React from 'react'
import { userArray } from '../users'

function Suggestions() {
  return (
    <div className='mt-4 ml-10'>
        <div className='flex justify-between text-sm mb-5'>

        <h3 className='text-sm font-bold text-gray-400'>Suggestions for you</h3>
        <button className='text-gray-600 font-semibold'>See All</button>
        </div>
        {
          userArray.slice(0, 5).map((profile) => (
            <div key={profile.id} className="flex justify-between items-center mt-3">
              <img 
              className='w-10 h-10 rounded-full border-[2px]'
              src={profile.profilePic} 
              alt="" />
              <div className='flex-1 ml-4'>
                <h2 className='font-semibold text-sm'>{profile.userName}</h2>
                <h3 className='text-xs text-gray-400'>{profile.email}</h3>
              </div>
              <button className='text-blue-400 text-sm font-bold'>Follow</button>

            </div>
          ))
            
        }
       
        
    </div>
  )
}

export default Suggestions