import React from 'react';
import { Box, InputLabel, MenuItem, Select, TextField, FormControl } from '@mui/material';

import { useContext } from "react";
import { AppContext } from "../context/ContextProvider";
import { usePoolIdData } from '../lib/usePoolIdData';
import { useEffect,useRef,useState } from 'react';

export function QueryFields() {
  const {account, setAccount, poolId, setPoolId} = useContext(AppContext)
  const [poolLocalValue, setPoolLocalValue] = useState(poolId ?? '');
  const [accountLocalValue, setAccountLocalValue] = useState(account ?? '');

  const selectedAccount = useRef(account)
  useEffect(()=>{
    setAccountLocalValue(account)
    //selectedAccount?.target?.setVa = account
  },[account])

  useEffect(()=>{
    setPoolLocalValue(poolId)
    //selectedAccount?.target?.setVa = account
  },[poolId])

  const { data } = usePoolIdData(account);
  if (poolId === undefined && data !== undefined && data.delegations[0] !== undefined) setPoolId(data.delegations[0].basePool.id)

  const PoolSelect = () => {
    if (poolId !== undefined ) {
      let items = []
      if (data !== undefined) {
        console.log("DATA",data)
        Object.entries(data.delegations).map(([key,value]) => items.push( <MenuItem key={key} value={value.basePool.id}>{value.basePool.id}</MenuItem>) )
      }
      return <>
      <Box paddingTop={1} width={550}>
      <FormControl>
        
        <TextField
          select
          ref={selectedAccount}
          onChange={(e) => {
            if (poolId !== e.target.value) setPoolId(e.target.value)
            setPoolLocalValue(e.target.value)
            console.log("select change")
          }} 
          variant="outlined"
          id="pool-select"
          label="Pool"
          //labelId='select-label'
          displayEmpty
          value={poolLocalValue}
        >
          {items}
        </TextField>
      </FormControl>
      </Box>
      </>
  }
  }

  return (<>
   
      <Box width={550}>
      <TextField 
        onChange={(e) => {
          if (account !== e.target.value) setAccount(e.target.value)
          setAccountLocalValue(e.target.value)
          console.log("textfield change")
        }} 
        fullWidth 
        id="account-address" 
        label="Address" 
        variant="outlined" 
        value={accountLocalValue}
        //defaultValue={accountLocalValue}
        onFocus={(event) => {
          event.target.select();
        }}
      />
      <PoolSelect/>
      </Box>
      
      
   
      </>
    
  );
  
}
