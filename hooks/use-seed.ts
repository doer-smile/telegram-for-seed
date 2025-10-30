"use client";

import { useSearchParams } from "next/navigation";

export function useSeed(): { seed: string; prefix: string; hasSeed: boolean } {
	const searchParams = useSearchParams();
	const seed = (searchParams.get("seed") ?? "").trim();
	const prefix = (searchParams.get("prefix") ?? "").trim();
	return { seed, prefix, hasSeed: seed.length > 0 };
}


