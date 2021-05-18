import axios from 'axios';
import { QueryClient } from 'react-query';

interface QueryClientProps {
  baseUrl: string;
  enabled: boolean;
  headers: { [key: string]: string };
  retry: boolean;
}

const queryClient = new QueryClient();

export const updateQueryClientOptions = (
  queryClient: QueryClient,
  { baseUrl, headers, retry = true, enabled = true }: QueryClientProps,
) => {
  queryClient.setDefaultOptions({
    queries: {
      enabled,
      retry,
      queryFn: async ({ queryKey }) => {
        const endpoint = queryKey.toString().replace(/^\//, '');
        const apiUrl = `${baseUrl.replace(/\/$/, '')}`;
        const response = await axios.get(`${apiUrl}/${endpoint}`, { headers });
        return response.data;
      },
    },
  });
};

export default queryClient;
