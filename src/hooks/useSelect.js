import {useState} from 'react'

const useSelect = (options, Validator) => {
    const [value, SetValue] = useState(options[0]);
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

    const Touched = (val)=>{
        SetIsTouched(val);
    }

    return {
        value,
        isTouched,
        isValidationPassed,
        isInValid,
        Reset,
        OnChangeHandler,
        OnBlurHandler,
        Touched
    }
};

export default useSelect;