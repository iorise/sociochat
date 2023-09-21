import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "@/providers/socket-provider";

const BATCH_MESSAGES = 5;

interface InfiniteScrollProps {
  queryKey: string;
  apiUrl: string;
  roomId?: string;
}

export function useInfiniteScroll({
  queryKey,
  apiUrl,
  roomId,
}: InfiniteScrollProps) {
  const { isConnected } = useSocket();
  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = qs.stringifyUrl(
      {
        url: apiUrl,
        query: {
          take: BATCH_MESSAGES,
          lastCursor: pageParam,
          roomId: roomId,
        },
      },
      { skipNull: true }
    );

    const payload = await fetch(url);
    return payload.json();
  };

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.lastCursor;
    },
    refetchInterval: isConnected ? false : 1000,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    isFetchingNextPage,
    status,
  };
}
