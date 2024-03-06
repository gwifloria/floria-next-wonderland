import useSWRMutation from "swr/mutation";

// 实现 fetcher
// 额外的参数可以通过第二个参数 `arg` 传入
// 在下例中，`arg` 为 `'my_token'`
async function uploadExcerpt({ arg }: { arg: string }) {
  await fetch("excerpt/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${arg}`,
    },
  });
}
