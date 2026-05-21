import "server-only";

interface DailyDevConfig {
	readonly baseUrl: string;
	readonly token: string;
}

function requireEnv(name: string): string {
	const value = process.env[name];

	if (!value) {
		throw new Error(`Missing required env variable: ${name}`);
	}

	return value;
}

export const dailyDevConfig: DailyDevConfig = {
	baseUrl: requireEnv("DAILY_DEV_API_BASE_URL"),
	token: requireEnv("DAILY_DEV_API_TOKEN"),
};
