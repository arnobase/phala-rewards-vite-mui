import { formatAddressShort } from "../lib/formatAddressShort";
import { formatAddress } from "../lib/formatAddress";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../context/AccountProvider";
import { AppContext } from "../context/ContextProvider";
import { fetchStakeData } from "../lib/fetchStakeData";
import { formatTokenBalance } from "../lib/formatTokenBalance";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, Box } from "@mui/material";
const style = {
  wrapper: `flex items-center justify-center mt-14`,
  content: `content-block bg-[#191B1F] rounded-2xl px-8 py-8 min-w-[500px]`
};

const WalletInfos = () => {
  const { walletAccount, wallet } = useContext(AccountContext)
  const { queryAccount, setQueryAccount } = useContext(AppContext)
  //const {  } = useContext(ApiContext)
  const [allAccounts,setAllAccounts] = useState()
  const [grandTotal,setgrandTotal] = useState()
  let localAllAccountsData = []
  const [allAccountsData,setAllAccountsDAta] = useState([])

  useEffect(()=>{
    console.log("wallet-------",wallet)
    const loadAccounts = async () => {
      const res= await wallet.getAccounts()
      setAllAccounts(res)
      console.log("RES",res)
    }
    //console.log("WALLET",wallet)
    if (wallet) loadAccounts()
  },[wallet,walletAccount])

  useEffect(()=>{
    let localGrandTotal = 0
    const fetchAllAccounts = async () => {
      await allAccounts?.map(async (a)=>{
        const res = await fetchStakeData(formatAddress(a.address))
        const val = JSON.parse(res).data.accounts[0]
        val.total = Number(val.stakePoolValue) + Number(val.vaultValue)
        console.log("val.stakePoolValue",val.stakePoolValue)
        console.log("val.vaultValue",val.vaultValue)
        localGrandTotal += val.total;
        localAllAccountsData.push(val)
        if (localAllAccountsData.length === allAccounts.length) {
          setAllAccountsDAta(localAllAccountsData)
          setgrandTotal(localGrandTotal);
        }
      })
    }
    if (allAccounts) fetchAllAccounts()
  },[allAccounts])

  useEffect(()=>{
    console.log("allAccountsData",allAccountsData)
  },[allAccountsData])

  return (<div className={style.wrapper}>
      <div className={style.content}>
          <div>
            <div className="py-1">
              <Box sx={{display:'inline-block', float:'right', margin:'0px 0 10px 0'}}>{grandTotal?.toLocaleString?.('en-US', {
                style: 'currency',
                currency: 'PHA',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}</Box>
              <TableContainer component={Paper} sx={{ marginTop:1, marginBottom:2 }}>
                <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="left">Address</TableCell>
                      <TableCell>Total stake</TableCell>
                      <TableCell>Stake Pools</TableCell>
                      <TableCell>Vaults</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {allAccounts?.map((a)=>{
                    const obj = allAccountsData.find(el => formatAddress(el.id) === formatAddress(a.address))
                    return <>        
                      <TableRow
                        key={a.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="right">{a.name}</TableCell>
                        <TableCell align="left">
                          
                          <Link
                            component="button"
                            variant="body2"
                            onClick={()=>{setQueryAccount(formatAddress(a.address))}}
                          >
                            {formatAddressShort(a.address)}
                          </Link>
                        </TableCell>
                        <TableCell align="right">{formatTokenBalance(obj?.total != 0 ? obj?.total : 0)}</TableCell>
                        <TableCell align="right">{formatTokenBalance(obj?.stakePoolValue != 0 ? obj?.stakePoolValue : 0)}</TableCell>
                        <TableCell align="right">{formatTokenBalance(obj?.vaultValue != 0 ? obj?.vaultValue : 0)}</TableCell>
                      </TableRow>
                    </>
                  })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
      </div>
    </div>
  );
};
export default WalletInfos;
