"use client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface Props {
  children: React.ReactNode;
}
function QueryProvider({children}: Props) {
  const queryClient = new QueryClient(); //configuring client

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
