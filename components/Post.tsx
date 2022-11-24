



import React, { DetailedHTMLProps, FormEvent, MouseEvent, useEffect, useState } from 'react'
import { BookmarkIcon, ChatBubbleOvalLeftIcon, EllipsisHorizontalIcon, FaceSmileIcon, HeartIcon, PaperAirplaneIcon} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, snapshotEqual } from 'firebase/firestore'
import { db } from '../firebase'
import Moment from "react-moment"


type Props = {
    id: string
    userName: string
    img: string
    caption: string
    userImg: string

}
// e: FormEvent<HTMLFormElement>
// : Props
function Post({ id, userName, img, caption, userImg}: Props) {
  const { data: session } = useSession();
  const [comment, setComment ] = useState("");
  const [comments, setComments ] = useState([]);
  const [likes, setLikes ] = useState([]);
  const [hasLiked, setHasLiked ] = useState(false);
  // console.log(comments)
  // console.log(session)

//  useEffect((snapshot) => onSnapshot(query(collection(db, "posts", id, "comments"), orderBy('timestamp', 'desc')), snapshot => setComments(snapshot.docs)), [])
useEffect(() => {
  return onSnapshot(query(collection(db, "posts", id, "comments"), orderBy('timestamp', 'desc')), (snapshot) => setComments(snapshot.docs))




}, [db, id])
// console.log(comments)
useEffect(() => {
  return onSnapshot(collection(db, "posts", id, "likes"), snapshot => setLikes(snapshot.docs))

}, [db, id]);

useEffect(() => {
  setHasLiked(
    likes.findIndex((like) => like.id === session?.user?.email) !== -1
  )
},[likes])


useEffect(() => onSnapshot(collection(db, "posts", id, "likes"), snapshot => setLikes(snapshot.docs)), [db, id])
const likePost = async () => {
  if(hasLiked) {
    await deleteDoc(doc(db, "posts", id, "likes", session?.user?.email));

  }
  else {

    await setDoc(doc(db, "posts", id, "likes", session?.user?.email), {
      username: session?.user?.name,
    })
  }
  }




  const sendComment = async (e: MouseEvent) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
//     await addDoc(collection(db, `posts${id}/comments`), { 
//   comment: comment, 
//   username: session?.user?.name,
//   userImage: session?.user?.image,
//   timestamp: serverTimestamp(),
// })
  // console.log(comment)
  await addDoc(collection(db, "posts", id, "comments"), {
    comment: commentToSend,
        username: session?.user?.name,
        userImage: session?.user?.image,
        timestamp: serverTimestamp(),

    
  })

  }

  return (
    <div className='bg-white my-7 border rounded-sm'>
      <div className='flex items-center p-5'>
        <img 
        className='rounded-full h-14 w-14 object-contain border p-1 mr-3'
        src={userImg}
         alt=""
          />
        <p className='flex-1 font-bold'>{userName}</p>
        <EllipsisHorizontalIcon className='h-5'/>

      </div>
        {/* image */}
        <img 
        className='object-cover w-full'
        src={img}
        loading="lazy"
         alt=""
          />
        {/* button */}
        {session && (

        <div className='flex justify-between px-4 pt-4'>
        <div className='flex space-x-4'>
          {
            hasLiked ? (
              <HeartIconFilled onClick={likePost} className='btn text-red-500'/>
            ): (

              <HeartIcon onClick={likePost} className="btn" />
              )
              
            }
          <ChatBubbleOvalLeftIcon className='btn' />
          <PaperAirplaneIcon className='btn -rotate-90'/>
        </div>
        <BookmarkIcon className='btn'/>

        </div>
        )}
       
        {/* caption */}
        <p className='p-5 truncate'>
          {likes.length > 0 && (
            <p className='font-bold mb-1'>{likes.length} likes</p>
          )}
          <span className='font-bold mr-1'>{userName}</span>{caption}</p>
       
        {/*  comments*/}
        {comments.length > 0 && (
          <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
            {comments.map((comment) => (
              <div key={comment.data().id} className="flex items-center space-x-2 mb-3">
                <img 
                className='h-7 rounded-full'
                src={comment.data().userImage} 
                alt="" />
                <p className='text-sm flex-1'>
                  <span className='font-bold'>{comment.data().username}</span>
                {" "}
                {comment.data().comment}</p>
                <Moment fromNow className='pr-5 text-xs'>
                  {comment.data().timestamp?.toDate()}
                </Moment>
                
                


              </div>
            ))}
          </div>
        )}
        {/* input box */}
        {session && (
        <form className='flex items-center p-4'>
            <FaceSmileIcon className='h-7'/>
            <input type="text" className='border-none flex-1 focus-within:ring-0 outline-none' placeholder='Add a comment...' value={comment} onChange={e => setComment(e.target.value)} />
            <button 
            onClick={sendComment}
            type='submit'
            disabled={!comment.trim()}
            
            className='font-semibold text-blue-400'>
              post
              </button>
        </form>

        )}
        
    </div>
  )
}

export default Post