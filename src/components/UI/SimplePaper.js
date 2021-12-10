import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function SimplePaper(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 600, 
        },
      }}
    >
      <Paper elevation={3}>
          <main>{props.children}</main>
          </Paper>
    </Box>
  );
}