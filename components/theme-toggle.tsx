"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	const isDark = (resolvedTheme ?? theme) === "dark";

	return (
		<button
			aria-label="Toggle theme"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			className={cn(
				"inline-flex h-9 w-9 items-center justify-center rounded-md text-zinc-700 transition-colors",
				"hover:text-zinc-900",
				"dark:text-zinc-300 dark:hover:text-white"
			)}
		>
			{mounted && (isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />)}
		</button>
	);
}


