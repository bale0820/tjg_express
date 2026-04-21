export interface User {
  id: number;

  role?: string;

  userId: string;     // 로그인 아이디
  name: string;
  email: string;
  password: string;

  phone?: string;
  gender?: string;
  birthday?: string;
  address?: string;

  provider?: string;  // 기본값 "local"
  recommendation?: string;
  zonecode?: string;
}