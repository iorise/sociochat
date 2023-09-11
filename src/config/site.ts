import { NavItem } from "@/types";

export const siteConfig = {
  name: "SocioChat",
  description: "A realtime chat app built with Next.js and Socket.io",
  url: "",
  navItem: [
    {
      title: "home",
      href: "/",
      icon: "home",
    },
    {
      title: "chat",
      href: "/chat",
      icon: "chat",
    },
  ] satisfies NavItem[],
};
