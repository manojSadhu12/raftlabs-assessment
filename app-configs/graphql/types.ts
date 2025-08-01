export type TransactionType = "DEBIT" | "CREDIT";

export interface Transaction {
    id: string;
    account_id: string;
    type: TransactionType;
    amount: number;
    description: string;
    date: string;
}

export interface Account {
    id: string;
    customer_id: string;
    account_number: string;
    balance: number;
    currency: string;
    Transactions?: Transaction[];
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    Accounts?: Account[];
}

// For query responses
export interface CustomersQueryData {
    Customers: Customer[];
}

export interface CustomerQueryData {
    Customer: Customer;
}

export interface AccountsQueryData {
    Accounts: Account[];
}

export interface TransactionsQueryData {
    allTransactions: Transaction[];
}