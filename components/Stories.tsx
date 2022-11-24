import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import {userArray }from "../users"
import Story from './Story'



function Stories() {
  const { data: session } = useSession();

  // console.log(userArray)
  return (
    <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll  scrollbar-thin scrollbar-thumb-black'>

      {session && (
        <Story img={session.user?.image!} userName={session.user?.name!}/>
      ) }
      {userArray.map((profile, idx) => (
        <Story 
        key={idx}
        userName={profile.userName} 
        img={profile.profilePic}




         />
      ))}
     
      {/* story */}
      {/* story */}
    </div>
  )
}

export default Stories