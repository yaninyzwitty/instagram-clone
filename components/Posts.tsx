import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import Post from './Post'

function Posts({}) {
 
   
   
    const [posts, setPosts ] = useState([]);

    useEffect(() => {
        // db is a collection of posts and then is another variable so you must include it in a dependaancy array
         return onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), (snapshot) => setPosts(snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
         }))));

       



    }, [db]);
    

    
    
  return (
    <div>
        {posts.map(({ id, data: username, profileImage, image, caption }) => (
            <Post
            key={id} 
            id={id}
            userName={username}
            userImg={profileImage}
            img={image}
            caption={caption}
            />
        ))}
        
        {/* postsss */}
    </div>
  )
}

export default Posts