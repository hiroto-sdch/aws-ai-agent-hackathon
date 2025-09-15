export interface User {
  user_id: string;
  email: string;
  risk_tolerance: 'low' | 'medium' | 'high';
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  risk_tolerance?: 'low' | 'medium' | 'high';
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}