"use client";

import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/ricardo-camilo-programador-frontend-web", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/ricardocamilo", icon: Linkedin },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background py-8 mt-auto">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center">
        <div className="flex gap-3">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {year} Ricardo Camilo. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
