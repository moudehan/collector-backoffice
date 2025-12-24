type AlertsByDayDto = {
  date: string;
  count: number;
};

type CountersDto = {
  users: number;
  articles: number;
  alerts: number;
  shops: number;
  messages: number;
};

type FraudStatsDto = {
  high: number;
  medium: number;
  riskIndex: number;
};

export type AdminStatsDto = {
  counters: CountersDto;
  fraud: FraudStatsDto;
  alertsByDay: AlertsByDayDto[];
};
