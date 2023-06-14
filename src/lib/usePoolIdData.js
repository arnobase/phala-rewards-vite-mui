import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

const QUERY_URL = "https://squid.subsquid.io/khala-computation/graphql"

export const usePoolIdData = (
    address,
  ) => {
    return useQuery(["poolIdData", address], () => {
      return request(
        QUERY_URL,
        gql`
        query poolIdData {
          delegations(where: {account: {id_eq: "${address}"}}) {
            basePool {
              id
              kind
            }
          }
        }
        `
      );
    });
  };