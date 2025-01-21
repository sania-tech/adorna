/**
 * Title Component
 *
 * This component renders a title with two parts (`text1` and `text2`). The `text2` is emphasized by a darker font weight.
 * The title is followed by a horizontal line to enhance the visual structure.
 *
 * - `text1`: The first part of the title text (appears lighter in color).
 * - `text2`: The second part of the title text (appears darker and in bold for emphasis).
 *
 * The title is enclosed within a flex container to align the text and the line horizontally. The line's width and height are responsive based on screen size.
 */
import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-gray-500'>
        {text1} <span className='text-gray-700 font-medium'>{text2}</span>
      </p>
      <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
    </div>
  )
}

export default Title;

