import "server-only";

import axios, {
	AxiosError,
	type AxiosInstance,
	type AxiosRequestConfig,
} from "axios";

import { dailyDevConfig } from "./config";
import { toDailyDevError } from "./errors";

interface DailyDevErrorBody {
	readonly error: string;
	readonly message: string;
}

class DailyDevClient {
	private readonly client: AxiosInstance;

	public constructor() {
		this.client = axios.create({
			baseURL: dailyDevConfig.baseUrl,
			timeout: 15_000,
			headers: {
				Authorization: `Bearer ${dailyDevConfig.token}`,
				Accept: "application/json",
			},
		});
	}

	public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			const response = await this.client.get<T>(url, config);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log("daily.dev error", {
					url: error.config?.url,

					params: error.config?.params,

					status: error.response?.status,

					data: error.response?.data,
				});

				throw toDailyDevError(
					error.response?.data as DailyDevErrorBody | undefined,
					error.response?.status ?? 500,
				);
			}

			throw error;
		}
	}
}

export const dailyDevClient = new DailyDevClient();
