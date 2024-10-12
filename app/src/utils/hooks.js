import { useEffect, useState } from "react"
import { getText } from "./language"
 
const useValidation = ( value, validations ) => {


    const [ isEmpty, setEmpty ] = useState(true)
    const [ minLength, setMinLength ] = useState(false)
    const [ maxLength, setMaxLength ] = useState(false)
    const [ isEmail, setEmail ] = useState(false)
    const [ isSame, setSame ] = useState(false)
    const [ err, setError ] = useState('')
    const [ inputValid, setInputValid ] = useState(false) 

    useEffect( () => {
        
        for (const validation in validations) {
            
            switch(validation){
                case 'minLength':
                    value.length < validations[validation] ? setMinLength(true) : setMinLength(false)
                break;

                case 'isEmpty':
                    if( value ){
                        setEmpty(false)
                        setError( '' )
                        
                    } else {
                        setEmpty(true)
                        setError( getText('ER_EMPTY') )
                    }
                    
                break;

                case 'isEmail':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if( emailRegex.test(value) && value ){
                        setEmail(false)
                        setError( '' )
                    } else {
                        setEmail(true)
                        setError( getText('ER_EMAIL') )
                    }
                   
                break;

                case 'maxLength':
                    
                    if( value.length > validations[validation]  ){
                        setMaxLength(true)
                        setError( getText('ER_MAX_LEN') )
                    } else {
                        setMaxLength(false)
                        
                    }
                  
                break

                /*
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                break;
                */
                /*
                case 'isEmail':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    (emailRegex.test(value) && value) ? setEmail(false) : setEmail(true)
                break;
                */

                case 'isSame':
                   
                    if( validations[validation] ){
                        if( value === validations[validation] ){
                            setSame(false)
                            setError( '' )
                        } else {
                            setSame(true)
                            setError( getText('ER_SAME') )
                        }
                    }
                   
                    break;
                    
            }
                
        }


    }, [value] )

    useEffect( () => {
        if( isEmpty || minLength || isEmail || isSame || maxLength ){
            setInputValid(true)
        } else {
            setInputValid(false)
        }

    }, [ isEmpty, minLength, isEmail, isSame, maxLength  ] )

    return {
        isEmpty,
        minLength,
        isEmail,
        isSame,
        maxLength,
        err,
        inputValid
    }

}

export const useInput = ( initialValue, validations ) => {
    const [ value, setValue ] = useState( initialValue )
    const [isDirty,setDirty] = useState( false )
    const valid = useValidation( value, validations )


    const clearInput = () => {
        setValue('')
        setDirty(false)
        valid.err = false
    }
    

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    const getError = () => {
        if( isDirty ){
            if( valid.err ){
                return <div className="errorBox">{valid.err}</div> 
            }

            return false
            
        }
        

    }


    return {
        value,
        onChange,
        onBlur,
        getError,
        isDirty,
        clearInput,
        ...valid
    }

}

