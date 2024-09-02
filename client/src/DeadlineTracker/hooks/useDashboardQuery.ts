import { ApiManager } from "@/Common/ApiEndpoints/ApiManager";
import { DashboardEndpoints } from "@/Common/ApiEndpoints/Endpoints";
import { useQuery } from "@tanstack/react-query";

export const useGetUpcommingDeadlines = (accountId:number) => {
  return useQuery({
    queryKey: ["upcommingDeadlines"],
    queryFn: async () => {
      const response = await ApiManager.get(
        DashboardEndpoints.getUpcommingDeadlines(accountId),
      );
      return response;
    },
  });
};
