import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import type { HistorySnapshotListItem } from "@/app/lib/types";

const HISTORY_DIR = path.join(process.cwd(), "history");

export async function GET(
	_: Request,
	context: {
		params: Promise<{
			date: string;
		}>;
	},
) {
	const { date } = await context.params;

	const file = await fs.readFile(
		path.join(HISTORY_DIR, `${date}.json`),
		"utf8",
	);

	const snapshot = JSON.parse(file) as HistorySnapshotListItem;

	return NextResponse.json({
		snapshot,
	});
}
