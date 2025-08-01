import { ApolloProvider } from "@apollo/client";
import React, { FC, PropsWithChildren } from "react";
import client from "./apollo-client";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

export default Provider;