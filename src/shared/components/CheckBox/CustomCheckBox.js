import React from 'react'

function CustomCheckBox(props) {
    const {text} = props
    return (
        <label className="flex items-center space-x-2">
               <input type="checkbox" className="form-checkbox text-blue-500 h-4 w-4" />
               <span className="text-gray-700">
                  {text}</span>
            </label>
    )
}

export default CustomCheckBox
