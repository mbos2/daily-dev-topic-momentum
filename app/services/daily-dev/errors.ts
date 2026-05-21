export class DailyDevRequestError extends Error {
  public readonly status: number;

  public constructor(message: string, status: number) {
    super(message);
    this.name = 'DailyDevRequestError';
    this.status = status;
  }
}

interface DailyDevErrorBody {
  readonly error: string;
  readonly message: string;
}

export function toDailyDevError(response: DailyDevErrorBody | undefined, status: number): DailyDevRequestError {
  return new DailyDevRequestError(response?.message ?? 'daily.dev request failed', status);
}
