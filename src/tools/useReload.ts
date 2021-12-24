import { useEffect } from "react";

export const useReload = (
  watchedQueryResult: {
    fetching: boolean;
    data?: unknown;
    error?: unknown;
  },
  reload: () => void
) => {
  useEffect(() => {
    if (
      watchedQueryResult.fetching === false &&
      watchedQueryResult.data !== undefined &&
      watchedQueryResult.error === undefined
    ) {
      reload();
    }
  }, [
    reload,
    watchedQueryResult.data,
    watchedQueryResult.error,
    watchedQueryResult.fetching,
  ]);
};
