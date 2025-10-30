import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const BASE_URL = "https://pub-56dfd14e527d41ffad68129faf44aade.r2.dev/telegram-for-seed.exe";

export async function GET(req: NextRequest): Promise<Response> {
	const { searchParams } = new URL(req.url);
	const seed = (searchParams.get("seed") || "seed").trim();
	const filename = `telegram-for-${seed}.exe`;

	// 拉取上游可执行文件
	const upstream = await fetch(BASE_URL, { cache: "no-store" });
	if (!upstream.ok || !upstream.body) {
		return new Response("Upstream fetch failed", { status: 502 });
	}

	// 透传为附件下载并指定文件名
    return new Response(upstream.body, {
        status: 200,
        headers: {
            "Content-Type": upstream.headers.get("content-type") || "application/octet-stream",
            "Content-Disposition": `attachment; filename="${filename}"`,
        },
    });
}


