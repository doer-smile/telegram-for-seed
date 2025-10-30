import { DOWNLOAD_HOST, DEFAULT_SOURCE_FILENAME, DEFAULT_PREFIX, DEFAULT_SEED } from "@/lib/constants";

export function buildTargetFilename(prefix?: string | null, seed?: string | null): string {
	const p = (prefix ?? "").trim() || DEFAULT_PREFIX;
	const s = (seed ?? "").trim() || DEFAULT_SEED;
	return `${p}-k.${s}.exe`;
}

export function buildDisplayUrl(prefix?: string | null, seed?: string | null): string {
	return `${DOWNLOAD_HOST}/${buildTargetFilename(prefix, seed)}`;
}

export function buildDownloadApi(prefix?: string | null, seed?: string | null): string {
	const p = (prefix ?? "").trim() || DEFAULT_PREFIX;
	const s = (seed ?? "").trim() || DEFAULT_SEED;
	return `/api/download?prefix=${encodeURIComponent(p)}&seed=${encodeURIComponent(s)}`;
}

export function getUpstreamUrl(): string {
	return `${DOWNLOAD_HOST}/${DEFAULT_SOURCE_FILENAME}`;
}


