import React, {PropTypes}  from 'react'


const DefaultLayout = (children) => {

   return (
  <div>{childern}</div>

   )
  
}
DefaultLayout.propTypes = {
  childern = PropTypes.element
}
export default DefaultLayout
