import React, { useState } from 'react'
import Markdown from 'react-markdown'

const CreationItem = ({ item }) => {

  const [expanded, setExpanded] = useState(false)
  return (
    <div onClick={() => setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-gray-800 border border-gray-700 rounded-lg cursor-pointer text-white'>
      <div className='flex justify-between items-center gap-4'>
        <div>
          <h2 className='font-semibold text-gray-200'>{item.prompt}</h2>
          <p className='text-gray-400 text-xs'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
        </div>
        <button className='bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1 rounded-full text-xs shrink-0'>{item.type}</button>
      </div>
      {
        expanded && (
          <div className='mt-4'>
            {item.type === 'image' ? (
              <div>
                <img src={item.content} alt={item.prompt} className='mt-3 w-full max-w-md rounded-lg' />
              </div>
            ) : (
              <div className='mt-3 h-full overflow-y-auto text-sm text-gray-300 prose prose-invert prose-sm max-w-none'>
                <Markdown>{item.content}</Markdown>
              </div>
            )}
          </div>
        )
      }
    </div>
  )
}

export default CreationItem
