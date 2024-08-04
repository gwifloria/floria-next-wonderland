import { useSWR, useSWRMutation } from "@/api/useFetch";
import { Destination } from "@/types";
import { useEffect, useMemo, useState } from "react";
const owner = "gwifloria";
const repo = "album";

interface GitItem {
  name: string;
  path: string;
}
// const urls = destinations.map(
//   (destination) =>
//     `https://api.github.com/repos/${owner}/${repo}/contents/pics/${destination.destination}`
// );
export const useDestinationUrl = (destinations?: Destination[]) => {
  const { data } = useSWR<{ html_url: string; name: string }[]>(
    `https://api.github.com/repos/${owner}/${repo}/contents/pics`,
    {
      token: `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`,
    },
  );

  const a = data?.reduce((prev, cur) => {
    const des = cur.name.split("_")[0];

    prev.set(des, prev.has(des) ? [...prev.get(des), cur] : [cur]);

    return prev;
  }, new Map());

  const res = destinations?.map((des) => {
    return a?.get(des.destination);
  });

  return { res };
};
