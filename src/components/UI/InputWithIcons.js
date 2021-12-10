import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Search from '@mui/icons-material/Search';
import {useState} from 'react';

export default function InputWithIcon(props) {

    const [stext, setSText] = useState('');
    const OnChangeHandler = (event) => {
        setSText(event.target.value);
    }

    const OnKeyDownHandler = (event) => {
        if(event.key==='Enter'){
            props.search(stext);
        }
    }    

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label={props.label} onChange={OnChangeHandler} onKeyDown={OnKeyDownHandler} value={stext} variant="standard" />
      </Box>
    </Box>
  );
}