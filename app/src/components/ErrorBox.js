import React from 'react';
import { _ERROR } from '../utils/error';

const ErrorBox = ({ show,  message }) => {
    return (
        <div className='boxError'>
            { show === 'error' && <span>{_ERROR(message)}</span>  }
          
        </div>
    );
};

export default ErrorBox;
