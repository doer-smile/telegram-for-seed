import { BASE_DOWNLOAD_URL } from "@/lib/constants";

export function buildDisplayUrl(seed: string | null | undefined): string {
	const safeSeed = (seed ?? "").trim();
	const finalSeed = safeSeed.length > 0 ? safeSeed : "seed";
	return BASE_DOWNLOAD_URL.replace("seed", finalSeed);
}

export function buildDownloadApi(seed: string | null | undefined): string {
	const safeSeed = (seed ?? "").trim();
	const finalSeed = safeSeed.length > 0 ? safeSeed : "seed";
	return `/api/download?seed=${encodeURIComponent(finalSeed)}`;
}


