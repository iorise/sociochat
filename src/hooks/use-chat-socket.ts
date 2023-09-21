import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { DirectMessageWithUser, GlobalWithUser } from "@/types";

import { useSocket } from "@/providers/socket-provider";

interface ChatSocketProps<T extends GlobalWithUser | DirectMessageWithUser> {
  addKey: string;
  updateKey: string;
  queryKey: string;
}

export function useChatSocket<
  T extends GlobalWithUser | DirectMessageWithUser
>({ addKey, updateKey, queryKey }: ChatSocketProps<T>) {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(updateKey, (message: T) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            data: page.data.map((item: T) => {
              if (item.id === message.id) {
                return message;
              }
              return item;
            }),
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    socket.on(addKey, (message: T) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                data: [message],
              },
            ],
          };
        }

        const newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          data: [message, ...newData[0].data],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [queryClient, addKey, queryKey, socket, updateKey]);
}
