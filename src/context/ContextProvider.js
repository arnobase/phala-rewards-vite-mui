import React, { useEffect, useState } from "react";
import { setToStorage, getFromStorage } from "../lib/storage";

export const AppContext = React.createContext();

export const ContextProvider = ({ children }) => {
  
  const [account, setStateAccount] = useState(undefined);
  const [poolId, setStatePoolId] = useState(undefined);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  let lsAccount = undefined;
  let lsPoolId = undefined;

  useEffect(()=>{
    loadContext()
  },[])
  
  const loadContext = () => {
    lsAccount = getFromStorage("account",true)
    //lsPoolId = getFromStorage("poolId",true)
    //lsAccount="43eaN9ye29zrKuDeCb6zBM71d4SQJNVqqUwtdEM3uvANaS2p"
    //lsPoolId="3106"
    if (typeof lsAccount !== "undefined") {
      setStateAccount(lsAccount)
    }
    if (typeof lsPoolId !== "undefined") {
      setStatePoolId(lsPoolId)
    }
  }

  const setAccount = (e) => {
    setToStorage("account",e,true)
    setStateAccount(e)
  }

  const setPoolId = (e) => {
    setToStorage("poolId",e,true)
    setStatePoolId(e)
  }

  return (
    <AppContext.Provider
      value={{
        account,
        setAccount,
        poolId,
        setPoolId,
        startDate,
        setStartDate,
        endDate,
        setEndDate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};