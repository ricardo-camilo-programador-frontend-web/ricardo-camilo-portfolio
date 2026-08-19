"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/Button";

const navItems = [
	{ label: "Home", href: "/" },
	{ label: "Projetos", href: "/projetos" },
	{ label: "Contato", href: "/contato" },
];

export function Header() {
	const { theme, setTheme } = useTheme();
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

	return (
		<header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/70 backdrop-blur">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link href="/" className="font-bold text-xl text-foreground">
					Ricardo Camilo
				</Link>

				<nav className="hidden md:flex items-center gap-6">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={toggleTheme}
						aria-label="Alternar tema"
					>
						<Sun className="h-4 w-4 dark:hidden" />
						<Moon className="h-4 w-4 hidden dark:block" />
					</Button>

					<Button
						variant="ghost"
						size="sm"
						className="md:hidden"
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
					>
						{menuOpen ? (
							<X className="h-4 w-4" />
						) : (
							<Menu className="h-4 w-4" />
						)}
					</Button>
				</div>

				{menuOpen && (
					<div className="absolute top-16 left-0 right-0 md:hidden border-t bg-background/95 backdrop-blur">
						<nav className="container mx-auto flex flex-col gap-2 p-4">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
									onClick={() => setMenuOpen(false)}
								>
									{item.label}
								</Link>
							))}
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
