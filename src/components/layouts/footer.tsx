"use client";

import { ToggleTheme } from "@/components/ui/toggle-theme";
import { siteConfig } from "@/config/site";
import CustomLink from "@/components/custom-link";
import { Icons } from "@/components/icons";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="pt-10 md:pt-16 flex items-center justify-between text-sm md:text-base">
        <section className="flex flex-col items-center gap-1">
          <p className="tracking-wide md:tracking-widest text-muted-foreground inline-flex">
            Developed by{" "}
          </p>
          <CustomLink
            href={siteConfig.github}
            target="_blank"
            className="flex items-center gap-1"
          >
            <Icons.github className="w-5 h-5 md:w-6 md:h-6 pb-0.5" />
            <span className="tracking-wide">iorise</span>
          </CustomLink>
        </section>
        <section className="tracking-normal flex flex-col items-center">
          <p className="tracking-wide md:tracking-widest text-muted-foreground">
            Stars me oniichan
          </p>
          <CustomLink href={siteConfig.github + "/sociochat"} target="_blank">
            {">_<"}
          </CustomLink>
        </section>
        <section>
          <ToggleTheme />
        </section>
      </div>
    </footer>
  );
}
