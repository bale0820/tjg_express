export interface UserDto {
  role?: string | null;

  userId: string;     // 로그인 아이디
  name: string;
  email: string;
  password: string;

  phone?: string;
  gender?: string;
  birthday?: string;
  address?: string;

  provider?: string | null;  // 기본값 "local"
  recommendation?: string | null;
  zonecode?: string;
}