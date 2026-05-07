

export interface KakaoApproveResponse {
  tid: string;                     // 결제 고유 번호
  cid: string;                     // 가맹점 코드
  status: string;                  // 결제 상태
  partnerOrderId: string;          // 가맹점 주문번호
  partnerUserId: string;           // 가맹점 회원아이디
  paymentMethodType: string;       // 결제 수단
  itemName: string;                // 상품명
  quantity: number;                // 상품 수량
  approvedAt: string;              // 결제 승인 시각
  cancelAt: string | null;         // 결제 취소 시각 (없을 수 있음)

  amount: {
    total: number | null;          // 총 금액
    taxFree: number | null;        // 비과세 금액
    vat: number | null;            // 부가세
    point: number | null;          // 포인트 사용
    discount: number | null;       // 할인 금액
    greenDeposit: number | null;   // 컵 보증금
  };
}