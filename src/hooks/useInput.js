import {useState} from 'react'

const useInput = (Validator) => {
    const [value, SetValue] = useState('');
    const [isTouched, SetIsTouched] = useState(false);

    let isValidationPassed = Validator(value);

    const isInValid = !isValidationPassed && isTouched;

    const Reset = ()=> {
        SetIsTouched(false);
        SetValue('');
    }

    const OnChangeHandler = (event) => {
        SetValue(event.target.value);
        SetIsTouched(true);
    }

    const OnBlurHandler = (event) => {
        SetIsTouched(true);
    }

    return {
        value,
        isTouched,
        isValidationPassed,
        isInValid,
        Reset,
        OnChangeHandler,
        OnBlurHandler
    }
};

export default useInput;