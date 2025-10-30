"use client";

import Link from "next/link";
import { JSX, useCallback, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
	onDownload?: () => void;
};

export function SiteHeader({ onDownload }: SiteHeaderProps) {
	const navRef = useRef<HTMLDivElement | null>(null);
	const [sliderStyle, setSliderStyle] = useState<{ left: number; width: number; opacity: number }>({ left: 0, width: 0, opacity: 0 });

	const moveSliderTo = useCallback((el: HTMLElement | null) => {
		const nav = navRef.current;
		if (!nav || !el) {
			setSliderStyle((s) => ({ ...s, opacity: 0 }));
			return;
		}
		const navRect = nav.getBoundingClientRect();
		const itemRect = el.getBoundingClientRect();
		const left = itemRect.left - navRect.left;
		const width = itemRect.width;
		setSliderStyle({ left, width, opacity: 1 });
	}, []);

	const clearSlider = useCallback(() => {
		setSliderStyle((s) => ({ ...s, opacity: 0 }));
	}, []);

	return (
		<header className={cn("w-full border-b border-zinc-200 dark:border-zinc-800 bg-transparent")}> 
			<div className={cn("w-full lg:w-[90%] xl:w-[80%] 2xl:w-[70%] mx-auto px-6 md:px-10 lg:px-12 h-14 flex items-center justify-between")}> 
				<div
					ref={navRef}
					className={cn("relative flex items-center gap-10 px-3")}
					onMouseLeave={clearSlider}
				>
					<Link href="#" className={cn("shrink-0 inline-flex items-center")}> 
						<img src="https://avatar.iran.liara.run/public/boy" alt="Logo" className={cn("h-8 w-8 rounded-full")}/>
					</Link>
					<Link href="#" className={cn("text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 px-4 py-1 rounded-md")}
						onMouseEnter={(e) => moveSliderTo(e.currentTarget)}
					>
						产品
					</Link>
					<Link href="#" className={cn("text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 px-4 py-1 rounded-md")}
						onMouseEnter={(e) => moveSliderTo(e.currentTarget)}
					>
						支持
					</Link>
					<Link href="#" className={cn("text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 px-4 py-1 rounded-md")}
						onMouseEnter={(e) => moveSliderTo(e.currentTarget)}
					>
						联系
					</Link>
					<div
						className={cn("pointer-events-none absolute -bottom-[13px] h-[2px] bg-zinc-900 dark:bg-zinc-100 transition-all duration-200")}
						style={{ left: sliderStyle.left, width: sliderStyle.width, opacity: sliderStyle.opacity }}
					/>
				</div>
                <div className={cn("flex items-center gap-3")}> 
                    <ThemeToggle />
                </div>
			</div>
		</header>
	);
}


