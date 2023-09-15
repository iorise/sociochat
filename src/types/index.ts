import { type Icons } from "@/components/icons";
import { Prisma } from "@prisma/client";

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
}

export type GlobalWithUser = Prisma.GlobalGetPayload<{
  include: {user: true};
}>;
