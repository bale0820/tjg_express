import { productRepository } from "@/repository/productRepository";
import { askOpenAI } from "@/util/askOpenAI";

export const reviewAnalysisService = {
    analyzeReviews: async (ppk: string): Promise<any> => {
        // 1️⃣ 리뷰 가져오기
        const reviews = await productRepository.findReviewsById(ppk);

        if (!reviews || reviews.length === 0) {
            throw new Error("리뷰가 없습니다.");
        }

        // 2️⃣ 상품명 추출
        const productName = reviews[0].productName;

        // 3️⃣ 리뷰 텍스트 모으기
        const reviewText = reviews
            .map((r: any) => `- ${r.content}`)
            .join("\n");

        // 4️⃣ GPT 프롬프트
        const prompt = `
아래는 특정 상품의 리뷰 목록이다.

⚠️ 반드시 아래 JSON 형식만 출력해라. 설명 문장 절대 포함하지 마라.
JSON 결과 외의 텍스트는 절대 넣지 마라.

{
  "tasteKeywords": ["string"],
  "positivePoints": ["string"],
  "qualityIssues": ["string"],
  "positiveCount": 0,
  "negativeCount": 0
}

분석 기준:
- 맛 관련 키워드 3~5개
- 고객들이 좋아하는 포인트 3~5개
- 품질 문제 3개
- 긍정/부정 리뷰 개수 계산
- 한국어 키워드 사용

상품명: ${productName}

리뷰 목록:
${reviewText}
`;

        // 5️⃣ GPT 호출
        const raw = await askOpenAI(prompt);

        // 6️⃣ JSON 파싱 (🔥 중요)
        try {
            const parsed = JSON.parse(raw);
            return parsed;
        } catch (err) {
            console.error("GPT 응답 파싱 실패:", raw);
            throw new Error("AI 응답 파싱 실패");
        }
    },

};
