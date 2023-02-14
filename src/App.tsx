import { AppRouter } from "router";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

import { AxiosErrorInterceptor } from "wrapper-components";
import { BugsnagErrorBoundary } from "components";

// React query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <BugsnagErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AxiosErrorInterceptor>
            <AppRouter />
          </AxiosErrorInterceptor>
        </BrowserRouter>
      </QueryClientProvider>
    </BugsnagErrorBoundary>
  );
}

export default App;
