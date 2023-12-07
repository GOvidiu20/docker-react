import React from 'react';
import Style from './Home.module.scss';
import {Box} from "@mui/material";

export default function Home() {

   return (
      <Box component={'main'} display={'flex'} flexDirection={{xs: 'column', md: 'row'}} alignItems={'center'}
           justifyContent={'center'} minHeight={'calc(100vh - 175px)'}>

         <Box>
            <h1>Hi, I'm <span style={{background: 'red', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Salut</span><span className={Style.hand}>🤚</span>
            </h1>
            <h2>I'm ovidiu.</h2>
            <Box component={'ul'} p={'0.8rem'}>

            </Box>
            <Box display={'flex'} gap={'1.5rem'} justifyContent={'center'} fontSize={{xs: '2rem', md: '2.5rem'}}>

            </Box>
         </Box>
      </Box>
   )
}