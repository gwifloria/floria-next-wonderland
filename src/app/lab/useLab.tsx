// src/api/useLabApi.ts
import { useSWR, useSWRMutation } from "@/api/useFetch";
import { LabEntry } from "./constant";

export function useLabApi() {
  const { data: entries, mutate } = useSWR<{ data: LabEntry[] }>(
    "/floria-service/lab/list",
  );

  const { trigger: addEntry } = useSWRMutation("/floria-service/lab/add", {
    method: "POST",
  });

  const { trigger: updateEntry } = useSWRMutation(
    "/floria-service/lab/update",
    { method: "PUT" },
  );

  const { trigger: deleteEntry } = useSWRMutation(
    "/floria-service/lab/delete",
    { method: "DELETE" },
  );

  return {
    entries: entries?.data,
    isLoading: !entries,
    addEntry,
    updateEntry,
    deleteEntry,
    refresh: mutate,
  };
}
