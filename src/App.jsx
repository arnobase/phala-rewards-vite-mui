import * as React from "react";
import Container from "@mui/material/Container";
import { ContextProvider } from "./context/ContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryFields } from "./components/QueryFields";
import { RewardsTable } from "./components/RewardsTable";
import { Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <Container maxWidth="lg">
          <Grid xs={12} lg={12} sm={12} item>
            <Typography variant="h2" gutterBottom>
              Khala delegation rewards
            </Typography>
          </Grid>
          <Grid xs={12} lg={12} sm={12} item>
            <QueryFields />
          </Grid>
          <Grid sx={{py:2}} container> 
            <RewardsTable/>
          </Grid>
        </Container>
      </ContextProvider>
    </QueryClientProvider>
  );
}
