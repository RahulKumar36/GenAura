import React, { useEffect, useState } from 'react'
import {useAuth, useUser} from '@clerk/clerk-react'
import { Heart } from 'lucide-react'
import axios from'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL


const Community = () => {
  const [creations,setCreations]=useState([])
  const {user}=useUser()
  const [loading,setLoading]=useState(true)
const {getToken}=useAuth()

const fetchCreations = async () => {
 try {
  const {data}=await axios.get('/api/user/get-published-creations',{headers:{Authorization:`Bearer ${await getToken()}`}})

  if(data.success){
    setCreations(data.creations)
  }else{
    toast.error(data.message)
  }
 } catch (error) {
  toast.error(error.message)
 }
 setLoading(false)
}


const imageLikeToggle =async (id) =>{
  try {
     const {data}=await axios.post('/api/user/toggle-like-creations',{id},{headers:{Authorization:`Bearer ${await getToken()}`}
  })

  if(data.success){ 
    toast.success(data.message)
    await fetchCreations()
  }else{
    toast.error(data.message)
  }
  } catch (error) {
    toast.error(error.message)
  }
}


useEffect(()=>{
  if(user){
    fetchCreations()
  }
},[user])

  return  !loading ? (
    <div className='flex-1 h-full flex flex-col gap-4 p-6 text-white'>
      <h2 className='text-xl font-semibold'>Community Creations</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-gray-800 h-full w-full rounded-xl overflow-y-auto p-4'>
{
  creations.map((creation,index)=>(
    <div key={index} className='relative group w-full h-64'>
      <img src={creation.content} alt={creation.prompt} className='w-full h-full object-cover rounded-lg' />

      <div className='absolute bottom-0 top-0 right-0 left-0 flex flex-col gap-2 items-end justify-end p-3 bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
        <p className='text-xs text-right w-full'>{creation.prompt}</p>
        <div className='flex gap-2 items-center self-end'>
          <p className='text-sm'>{creation.likes.length}</p>
          <Heart onClick={()=>imageLikeToggle(creation.id)} className={ `w-5 h-5 hover:scale-110 cursor-pointer ${
            creation.likes.includes(user.id) ?'fill-red-500 text-red-600':'text-white'
          }`}/>
        </div>
      </div>
    </div>
  ))
}
      </div>
      
    </div>
  ) :(
    <div className='flex justify-center items-center h-full'>
      <span className='w-10 h-10 my-1 rounded-full border-4 border-purple-500 border-t-transparent animate-spin'></span>
    </div>
  )
}

export default Community
