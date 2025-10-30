"use client";

import { cn } from "@/lib/utils";
import { buildDisplayUrl, buildDownloadApi } from "@/lib/url";
import { AnimatedSubscribeButtonDemo } from "@/components/animated-subscribe-button-demo";

type DownloadSectionProps = {
	seed: string;
	hasSeed: boolean;
};

export function DownloadSection({ seed, hasSeed }: DownloadSectionProps) {
	const displayUrl = buildDisplayUrl(seed);

	function handleDownload(): void {
		window.location.href = buildDownloadApi(seed);
	}

	return (
		<div className={cn("w-full px-6 py-12 space-y-3 text-center")}> 
			<p className={cn("font-mono text-sm whitespace-nowrap overflow-hidden inline-block w-full align-top underline")}>{displayUrl}</p>
			<div className={cn("mt-4 flex items-center justify-center")}> 
				<AnimatedSubscribeButtonDemo onClick={hasSeed ? handleDownload : undefined} />
			</div>
		</div>
	);
}


