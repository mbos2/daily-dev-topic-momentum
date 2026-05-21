import "server-only";

import { list } from "@vercel/blob";
import { HISTORY_PREFIX } from "./storage";
import type { BattleSnapshot } from "@/app/lib/types";

export async function readSnapshot(id: string): Promise<BattleSnapshot> {
	const result = await list({
		prefix: HISTORY_PREFIX,
	});

	const blob = result.blobs.find((item): boolean =>
		item.pathname.endsWith(`${id}.json`),
	);

	if (blob === undefined) {
		throw new Error("Snapshot not found");
	}

	const response = await fetch(blob.url, {
		headers: {
			Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
		},
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(await response.text());
	}

	return (await response.json()) as BattleSnapshot;
}
