import { gql } from "@apollo/client";

export const QUERY_GET_TRANSACTIONS = gql`
  query GetTransactions($account_id: ID!, $page: Int) {
    allTransactions(filter: {account_id: $account_id}, page:$page, perPage: 20, sortField: "date", sortOrder: "desc") {
      id
      type
      amount
      description
      date
    }
  }
`;