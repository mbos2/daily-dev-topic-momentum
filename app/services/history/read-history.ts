import "server-only";

import { list } from "@vercel/blob";

import { HISTORY_PREFIX } from "./storage";
import type {
	HistorySnapshotListItem,
	BattleSnapshot,
	HistoryResponseDto,
} from "@/app/lib/types";

async function loadSnapshot(url: string): Promise<HistorySnapshotListItem> {
	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
		},
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(await response.text());
	}

	const snapshot = (await response.json()) as BattleSnapshot;

	return {
		id: snapshot.id,

		battleName: snapshot.battleName,

		createdAt: snapshot.createdAt,

		winner: snapshot.winner,
	};
}

export async function readHistory(): Promise<HistoryResponseDto> {
	const result = await list({
		prefix: HISTORY_PREFIX,
	});

	const snapshots = await Promise.all(
		result.blobs.map((blob) => loadSnapshot(blob.url)),
	);

	snapshots.sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
	);

	return {
		snapshots,
	};
}
