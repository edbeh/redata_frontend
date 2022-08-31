import { useEffect } from "react";
import { AppRouter } from "router";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import { AxiosErrorInterceptor } from "wrapper-components";

// React query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AxiosErrorInterceptor>
          <AppRouter />
        </AxiosErrorInterceptor>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
