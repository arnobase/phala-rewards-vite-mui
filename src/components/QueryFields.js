import React from 'react';
import { Grid, MenuItem, TextField, FormControl } from '@mui/material';

import { useContext } from "react";
import { AppContext } from "../context/ContextProvider";
import { usePoolIdData } from '../lib/usePoolIdData';
//import { useRewardsData } from '../lib/useRewardsData';
import { useEffect,useRef,useState } from 'react';

export function QueryFields() {
  const {queryAccount, setQueryAccount, poolId, setPoolId} = useContext(AppContext)
  const [poolLocalValue, setPoolLocalValue] = useState(poolId ?? '');
  const [accountLocalValue, setAccountLocalValue] = useState(queryAccount ?? '');

  const selectedAccount = useRef(queryAccount)
  useEffect(()=>{
    setAccountLocalValue(queryAccount)
    //selectedAccount?.target?.setVa = account
  },[queryAccount])

  useEffect(()=>{
    setPoolLocalValue(poolId)
    //selectedAccount?.target?.setVa = account
  },[poolId])

  const { data } = usePoolIdData(queryAccount);
  if (poolId === undefined && data !== undefined && data.delegations[0] !== undefined) setPoolId(data.delegations[0].basePool.id)

  const PoolSelect = () => {
   // const rewardsdata = useRewardsData(account, poolId);
    if (poolId !== undefined ) {
      let items = []
      if (data !== undefined) {
        console.log("DATA",data)
        Object.entries(data.delegations).map(([key,value]) => items.push( <MenuItem key={key} value={value.basePool.id}>{value.basePool.id}</MenuItem>) )
      }
      return <>
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
      </>
  }
  }

  return (<>
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TextField 
          onChange={(e) => {
            if (queryAccount !== e.target.value) setQueryAccount(e.target.value)
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
      </Grid>
      <Grid item xs={4}>
        <PoolSelect/>
      </Grid>
    </Grid>   
  </>
    
  );
  
}
