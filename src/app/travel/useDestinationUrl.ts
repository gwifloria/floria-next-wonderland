import { useSWR } from "@/api/useFetch";
import { Destination, GitItem, MapDestinationMarker } from "@/types";
import { useMemo } from "react";
const owner = "gwifloria";
const repo = "album";

export const useDestinationUrl = (
  destinations?: Destination[],
): MapDestinationMarker[] | undefined => {
  const { data } = useSWR<GitItem[]>(
    `https://api.github.com/repos/${owner}/${repo}/contents/pics`,
    {
      token: `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`,
    },
  );

  const a = useMemo(() => {
    return data?.reduce((prev, cur) => {
      const des = cur.name.split("_")[0];

      prev.set(des, prev.has(des) ? [...prev.get(des), cur] : [cur]);

      return prev;
    }, new Map());
  }, [data]);

  const res = destinations?.map((des) => {
    return {
      ...des,
      gitImages: a?.get(des.destination),
    };
  });
  return res;
};
