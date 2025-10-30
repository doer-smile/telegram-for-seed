import type { NextRequest } from "next/server";
import { buildTargetFilename, getUpstreamUrl } from "@/lib/url";

export const runtime = "nodejs";

export async function GET(req: NextRequest): Promise<Response> {
	const { searchParams } = new URL(req.url);
	const seed = searchParams.get("seed");
	const prefix = searchParams.get("prefix");
	const filename = buildTargetFilename(prefix, seed);

	const upstream = await fetch(getUpstreamUrl(), { cache: "no-store" });
	if (!upstream.ok || !upstream.body) {
		return new Response("Upstream fetch failed", { status: 502 });
	}

	return new Response(upstream.body, {
		status: 200,
		headers: {
			"Content-Type": upstream.headers.get("content-type") || "application/octet-stream",
			"Content-Disposition": `attachment; filename="${filename}"`,
		},
	});
}


