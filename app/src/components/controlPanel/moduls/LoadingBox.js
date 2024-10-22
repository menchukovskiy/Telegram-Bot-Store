import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader'

const LoadingBox = () => {
    
    return (
        <div className='loadingBox'>
            <PropagateLoader size={9}  color="#fff" />
        </div>
    );
};

export default LoadingBox;