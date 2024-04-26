import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

//const QUERY_URL = "https://squid.subsquid.io/khala-computation/graphql"

export const useRewardsData = (
    address,
    pool_id,
    network="khala"
  ) => {
    const QUERY_URL = "https://subsquid.phala.network/"+network+"-computation/graphql"
    const _query =`
    query Rewards {
      delegationSnapshots(where: {delegation_eq: "${pool_id}-${address}"}) {
        delegation
        cost
        id
        updatedTime
        value
      }
    }`
    
    /*
    `
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
    }`*/


    //console.log("####",_query)
    return useQuery(["rewardsdata"+network, address, pool_id], () => {
      return request(
        QUERY_URL,
        gql `${_query}`
      );
    });
  };