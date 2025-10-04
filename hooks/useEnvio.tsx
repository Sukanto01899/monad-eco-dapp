import { envioClient } from "@/lib/config/envioClient";
import { GET_ACTIONS } from "@/lib/utils/gqlQueries";
import { useQuery } from "@tanstack/react-query";

// export function useActions() {
//   return useQuery({
//     queryKey: ["actions"],
//     queryFn: async () => {
//       const data = await envioClient.request(GET_ACTIONS);
//       return data?.ActionLoggeds;
//     },
//     refetchInterval: 5000, // every 5 sec auto refresh
//   });
// }
