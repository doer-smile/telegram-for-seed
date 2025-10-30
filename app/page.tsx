"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { buildDownloadApi } from "@/lib/url";
import { SiteHeader } from "@/components/site-header";
import { DownloadSection } from "@/components/download-section";
import { useSeed } from "@/hooks/use-seed";

export default function Home() {
	const { seed, hasSeed } = useSeed();
	const [currentUrl, setCurrentUrl] = useState<string>("");
    function handleDownload(): void {
        const url = buildDownloadApi(seed);
        window.location.href = url;
    }
	useEffect(() => {
		setCurrentUrl(window.location.href);
	}, []);



	return (
		<div className={cn("min-h-dvh w-full flex flex-col")}> 
            <SiteHeader onDownload={hasSeed ? handleDownload : undefined} />
			<main className={cn("flex-1 flex items-center justify-center")}> 
				<DownloadSection seed={seed} hasSeed={hasSeed} />
			</main>
		</div>
	);
}
