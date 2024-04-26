import React from 'react';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

import { useContext } from "react";
import { AppContext } from "../context/ContextProvider";
import { useState, useEffect } from 'react';


export function DatesFields() {
  
  const { poolId, startDate, setStartDate, endDate, setEndDate } = useContext(AppContext);
  const [startLocalValue, setStartLocalValue] = useState(dayjs())
  const [endLocalValue, setEndLocalValue] = useState(dayjs())

  useEffect(()=>{
    setStartLocalValue(startDate)
    setEndLocalValue(endDate)
    //("change datessssss")
  },[poolId])

  return (<>
   
   <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker 
        onChange={(e) => {
          setStartDate(e)
          setStartLocalValue(e)
          //console.log("start date change",e)
        }} 
        //defaultValue={dayjs()} 
        value={startLocalValue}
      />
      <DateTimePicker 
        onChange={(e) => {
          setEndDate(e)
          setEndLocalValue(e)
          //("end date change",e)
        }} 
        //defaultValue={dayjs()} 
        value={endLocalValue} 
      />
    </LocalizationProvider>
      </>
    
  );
  
}
