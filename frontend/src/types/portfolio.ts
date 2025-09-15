export interface Portfolio {
  portfolio_id: string;
  user_id: string;
  symbol: string;
  quantity: number;
  average_price: number;
  purchase_date?: string;
  created_at: string;
  updated_at?: string;
}

export interface PortfolioWithMarketData extends Portfolio {
  current_price?: number;
  current_value?: number;
  unrealized_pnl?: number;
  unrealized_pnl_percent?: number;
}

export interface CreatePortfolioItem {
  symbol: string;
  quantity: number;
  average_price: number;
  purchase_date?: string;
}

export interface UpdatePortfolioItem {
  quantity?: number;
  average_price?: number;
  purchase_date?: string;
}