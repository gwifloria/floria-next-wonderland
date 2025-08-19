// src/api/useLabApi.ts
import { useSWR, useSWRMutation } from "@/api/useFetch";
import { LabEntry } from "./type";

export function useLabApi() {
  const {
    data: entries,
    mutate,
    isLoading: isFetchingList,
  } = useSWR<{ data: LabEntry[] }>("/floria-service/lab/list");

  const { trigger: addEntry } = useSWRMutation("/floria-service/lab/add", {
    method: "POST",
  });

  const { trigger: updateEntry, isMutating: isUpdating } = useSWRMutation(
    "/floria-service/lab/update",
    { method: "POST" },
  );

  const { trigger: deleteEntry, isMutating: isDeleting } = useSWRMutation(
    "/floria-service/lab/delete",
    { method: "POST" },
  );

  return {
    entries: entries?.data,
    isLoading: isFetchingList || isDeleting || isUpdating,
    addEntry,
    updateEntry,
    deleteEntry,
    refresh: mutate,
  };
}
