import React, { useEffect, useState } from "react";
import { setToStorage, getFromStorage } from "../lib/storage";
//import { ApiContext } from "../context/ApiProvider";

export const AccountContext = React.createContext();

export const AccountProvider = ({ children }) => {
  //const { api } = useContext(ApiContext);
  const [walletAccount, setStateAccount] = useState(undefined);
  const [wallet, setStateWallet] = useState(undefined);
  let lsAccount = undefined;

  useEffect (()=>{
    const loadSigner = async () => {
      console.log("using account: "+walletAccount.address)
      const { getWalletBySource} = await import('@talismn/connect-wallets');
      //console.log(walletAccount.source)
      const injector = await getWalletBySource(walletAccount.source);
      setStateWallet(injector);
      console.log("Wallet(injector)",injector)
      await injector.enable('Lucky')
      //api.setSigner(injector.signer)
      
    }
    if (walletAccount && walletAccount!== "undefined") loadSigner();
  },[walletAccount]);

  useEffect(()=>{
    loadAccount()
  },[])
  
  const loadAccount = () => {
    lsAccount = getFromStorage("walletAccount",true)
    //console.log("lsAccount",lsAccount)
    if (typeof lsAccount !== "undefined" && lsAccount !== null) {
      setStateAccount(lsAccount)
    }
  }

  const setWalletAccount = (a) => {
    setToStorage("walletAccount",a,true)
    setStateAccount(a)
    
  }

  return (
    <AccountContext.Provider
      value={{
        walletAccount,
        wallet,
        setWalletAccount,
        loadAccount
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};