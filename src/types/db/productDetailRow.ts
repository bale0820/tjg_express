import { RowDataPacket } from "mysql2";

export interface ProductDetailRow extends RowDataPacket {
  // product table
  id: number; // PK
  pid: string; // 상품 코드
  imageUrl: string; // 이미지
  imageUrlName: string; // 이미지URL이름
  brandName: string; // 브랜드명
  productName: string; // 상품명
  price: number; // 가격
  origin: string; // 원산지
  unit: string; // 판매단위
  weight: string; // 중량/용량
  count: number; // 재고 수량
  dc: number; // 할인율
  description: string; // 설명
  isHotDeal: boolean; // 핫딜 유무
  isMemberSpecial: boolean; // 멤버십 유무
  productDescriptionImage: string; // 상품 정보 이미지
  productInformationImage: string; // 상품 상세 이미지
  productDate: string; // 날짜 (LocalDate → string)
  seller: string; // 판매자 정보
  allergyInfo: string; // 알레르기 정보
  notes: string; // 안내 사항

  // category
  categorySubId: number;
  categoryMainId: number;

  // delivery
  delType: number;
  delName: string;
  delDescription: string;
}