import React from 'react'
import { Link } from 'react-router-dom'
import"./style.css"
const Redirect = () => {
  return (
    <div className='Redirect-link'>
        <h1>Page Not Found</h1>
      <Link to="/podcasts">Back</Link>
    </div>
  )
}

export default Redirect
