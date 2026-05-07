export interface ProductReview {
  id: number;
  content: string;
  date: Date;
  images: string;       // JSON or comma string일 가능성 있음
  isBest: number;      // tinyint → number
  likes: number;
  ppk: number;
  productName: string;
  tags: string;         // JSON or 문자열
  title: string;
  upk: number;
  name: string;         // users.name
}