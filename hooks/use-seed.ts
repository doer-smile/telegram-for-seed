"use client";

import { useSearchParams } from "next/navigation";

export function useSeed(): { seed: string; hasSeed: boolean } {
	const searchParams = useSearchParams();
	const seed = (searchParams.get("seed") ?? "").trim();
	return { seed, hasSeed: seed.length > 0 };
}


