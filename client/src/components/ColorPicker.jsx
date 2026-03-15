import { Check, Palette } from 'lucide-react'
import React, { useState } from 'react'

const ColorPicker = ({selectedColor, onChange}) => {
    const colors = [
  { "name": "Black", "value": "#000000" },
  { "name": "Dark Gray", "value": "#333333" },
  { "name": "Charcoal", "value": "#444444" },
  { "name": "Light Gray", "value": "#D3D3D3" },
  { "name": "Navy Blue", "value": "#003366" },
  { "name": "Steel Blue", "value": "#4682B4" },
  { "name": "Midnight Blue", "value": "#191970" },
  { "name": "Dark Green", "value": "#006400" },
  { "name": "Slate Blue", "value": "#6A5ACD" },
  { "name": "Crimson", "value": "#DC143C" },
  { "name": "Olive", "value": "#808000" },
  { "name": "Deep Sky Blue", "value": "#00BFFF" },
  { "name": "Light Blue", "value": "#ADD8E6" }
]

    const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='relative'>
        <button onClick={()=>setIsOpen(!isOpen)} className='flex items-center mt-5 ml-4 text-sm text-indigo-500 bg-gradient-to-br from-indigo-400 to-purple-400 ring-purple-500 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Palette size={14} className="mr-2 text-white" onClick={() => setIsOpen(!isOpen)}/>
            <span className='max-sm:hidden text-white'>Accent</span>
        </button>
        {isOpen && (
            <div className="grid grid-cols-4 w-60 gap-2 absolute top-0 left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
                {colors.map((color) => (
                    <div 
                    onClick={()=>{onChange(color.value); setIsOpen(false)}}
                    key={color.value} 
                    className="relative cursor-pointer group flex flex-col">
                        <div className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors" style={{backgroundColor:color.value}}></div>
                        {selectedColor === color.value && (
                            <Check size={16} className="absolute top-1 right-1 text-white bg-black rounded-full"/> 
                        )}
                        <p className='text-xs text-center mt-1 text-gray-600'>{color.name}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default ColorPicker