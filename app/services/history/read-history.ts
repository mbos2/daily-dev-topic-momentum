import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import type {
	HistorySnapshotListItem,
	HistoryResponseDto,
} from "@/app/lib/types";

const HISTORY_DIR = path.join(process.cwd(), "history");

async function readSnapshots(): Promise<HistorySnapshotListItem[]> {
	try {
		const file = await fs.readFile(
			path.join(HISTORY_DIR, "snapshots.json"),
			"utf8",
		);

		return JSON.parse(file) as HistorySnapshotListItem[];
	} catch {
		return [];
	}
}

export async function readHistory(): Promise<HistoryResponseDto> {
	return {
		snapshots: await readSnapshots(),
	};
}
