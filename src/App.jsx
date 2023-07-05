import * as React from "react";
import Container from "@mui/material/Container";
import { ContextProvider } from "./context/ContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryFields } from "./components/QueryFields";
import { RewardsTable } from "./components/RewardsTable";
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import { DatesFields } from "./components/DatesFields";
import WalletInfos from "./components/WalletInfos";
import { AccountSelect } from "./components/AccountSelect";
import { AccountProvider } from "./context/AccountProvider";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <AccountProvider>
          <Container maxWidth="md" sx={{marginTop:2}}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography variant="h4" gutterBottom>
                  Phala delegation Rewards
                </Typography>
              </Grid>
              <Grid item justifyContent="flex-end" xs={4}>
                <AccountSelect />
              </Grid>
              <Grid xs={12} lg={12} sm={12} item>
                <WalletInfos />
                <QueryFields />
                {/*<DatesFields />*/}
              </Grid>
              <Grid sx={{py:2}} container> 
                <RewardsTable/>
              </Grid>
            </Grid>
          </Container>
        </AccountProvider>
      </ContextProvider>
    </QueryClientProvider>
  );
}
