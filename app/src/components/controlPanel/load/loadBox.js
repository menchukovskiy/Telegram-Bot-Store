import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader'



const LoadBox = ( {status} ) => {
    return (
        status === 'waiting' ?
            <div id='loadBox'>
        <PropagateLoader size={9}  color="#fff" />
        </div> : null
         
        
    );
};

export default LoadBox;