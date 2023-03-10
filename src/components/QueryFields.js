import React from 'react';
import { Box, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { useContext } from "react";
import { AppContext } from "../context/ContextProvider";
import { usePoolIdData } from '../lib/usePoolIdData';

export function QueryFields() {
  
  const {account, setAccount, poolId, setPoolId} = useContext(AppContext)

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
        <InputLabel id="pool-label">Pool</InputLabel>
        <Select
          onChange={(e) => {
            if (poolId !== e.target.value) setPoolId(e.target.value)
          }} 
          labelId="pool-label"
          id="pool-select"
          label="Pool"
          displayEmpty
          value={poolId}
          defaultValue=" "
        >
          {items}
        </Select>
      </>
  }
  }

  return (<>
   
      <Box width={600} >
      <TextField 
        onChange={(e) => {
          if (account !== e.target.value) setAccount(e.target.value)
        }} 
        fullWidth 
        id="account-address" 
        label="Address" 
        variant="outlined" 
        value={account}
        defaultValue=" "
      />
      </Box>
      
      <PoolSelect/>
   
      </>
    
  );
  
}
