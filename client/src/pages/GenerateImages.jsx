import { Hash, Image, Sparkles, Download } from 'lucide-react' // 1. Imported Download
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const GenerateImages = () => {
  const imageStyle = ['Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', 'Realistic style', '3D style', 'Portrait style']

  const [selectedStyle, setSelectedStyle] = useState('Realistic')
  const [input, setInput] = useState('')

  const [publish, setPublish] = useState(false)

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const prompt = ` Generate an image of ${input} in the style ${selectedStyle}`

      const { data } = await axios.post('/api/ai/generate-image', { prompt, publish }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.content)
        toast.success('Image generated successfully!') // 2. Added success toast
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  // 3. Added the download handler function
  const handleDownload = async () => {
    if (!content) {
      toast.error('No image to download.');
      return;
    }

    try {
      const response = await fetch(content);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = `${selectedStyle.toLowerCase().replace(' ', '-')}_${input.split(' ').slice(0, 3).join('_') || 'generated-image'}.png`;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success('Image download started!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download image.');
    }
  };

  return (
    <div className='h-full overflow-y-auto p-6 flex items-start flex-wrap gap-4 text-gray-300'>
      {/*left-col*/}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-gray-800 rounded-lg border border-gray-700'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#00AD25]' />
          <h1 className='text-xl font-semibold text-white'>AI Image Generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium text-gray-300'>Describe Your Image</p>
        <textarea onChange={(e) => setInput(e.target.value)} value={input} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-600 bg-gray-900 text-white placeholder-gray-500' placeholder='Describe what you want to see in the image...' required />

        <p className='mt-4 text-sm font-medium text-gray-300'>Style</p>

        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {imageStyle.map((item) => (
            <span onClick={() => setSelectedStyle(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item ? 'bg-green-500/10 border-green-500 text-green-400' : 'text-gray-400 border-gray-600 hover:bg-gray-700'}`} key={item}>{item}</span>
          ))}
        </div>

        <div className='my-6 flex items-center gap-3'>
          <label className='relative cursor-pointer'>
            <input type="checkbox" onChange={(e) => setPublish(e.target.checked)} checked={publish} className='sr-only peer' />

            <div className='w-9 h-5 bg-gray-600 rounded-full peer-checked:bg-green-500 transition'></div>
            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
          </label>
          <p className='text-sm text-gray-300'>Make this image Public</p>
        </div>


        <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 text-sm rounded-lg cursor-pointer disabled:opacity-50'>
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Image className='w-5' />
          }

          Generate Image
        </button>
      </form>
      {/*right-col*/}
      <div className='w-full max-w-lg p-4 bg-gray-800 rounded-lg flex flex-col border border-gray-700 min-h-96 '>
        {/* 4. Updated this header to include the button */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Image className='w-5 h-5 text-[#00AD25]' />
            <h1 className='text-xl font-semibold text-white'>Generated Image</h1>
          </div>
          {/* 5. Added the download button, styled for dark mode */}
          {content && (
            <button
              onClick={handleDownload}
              className='p-2 rounded-full text-gray-400 hover:bg-gray-700 hover:text-green-400 transition'
              title="Download Image"
            >
              <Download className='w-5 h-5' />
            </button>
          )}
        </div>
        {
          !content ? (
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
                <Image className='w-9 h-9' />
                <p>Describe your image and click "Generate Image" to get started</p>
              </div>

            </div>
          ) : (
            <div className='mt-3 h-full'>
              {/* Kept your original object-contain style */}
              <img src={content} alt="generated image" className='w-full h-full object-contain rounded-lg' />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default GenerateImages