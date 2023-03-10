import React from 'react';
import { Box, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { useContext } from "react";
import { AppContext } from "../context/ContextProvider";

export function DatesFields() {
  
  const { startDate, endDate } = useContext(AppContext);

  return (<>
   
   <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker 
        //defaultValue={startDate} 
        value={startDate}
      />
      <DateTimePicker 
        //defaultValue={endDate} 
        value={endDate} 
      />
    </LocalizationProvider>
   
      </>
    
  );
  
}
