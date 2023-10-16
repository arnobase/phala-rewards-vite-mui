import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

//const QUERY_URL = "https://squid.subsquid.io/khala-computation/graphql"
const QUERY_URL = "https://subsquid.phala.network/khala-computation/graphql"
export const useRewardsData = (
    address,
    pool_id
  ) => {
    return useQuery(["rewardsdata", address, pool_id], () => {
      return request(
        QUERY_URL,
        gql`
        query Rewards {
          delegationSnapshots(limit: 1, where: {delegation: {account: {id_eq: "${address}"}}, id_startsWith: "${pool_id}-"}) {
            delegation {
              id
              snapshots(orderBy: updatedTime_ASC) {
                updatedTime
                value
                cost
              }
            }
          }
        }`
      );
    });
  };