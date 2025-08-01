import { gql } from "@apollo/client";

export const QUERY_GET_CUSTOMER = gql`
  query GetCustomerAndAccounts($id: ID!) {
    Customer(id: $id) {
      id
      name
      email
      phone
      Accounts {
        id
        account_number
        balance
        currency
        customer_id
      }
    }
  }
`;

export const QUERY_GET_LATEST_TRANSACTIONS = gql`
  query GetLatestTransactions($account_id: ID!) {
    allTransactions(filter: {account_id: $account_id}, page:0, perPage: 3, sortField: "date", sortOrder: "desc") {
      id
      type
      amount
      description
      date
    }
  }
`;