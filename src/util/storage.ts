import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {

    // 확장자 추출 (.png, .jpg ...)
    const ext = path.extname(file.originalname);

    // 현재시간 기반 파일명 생성
    const filename = `${Date.now()}${ext}`;

    cb(null, filename);

  }
});

export const upload = multer({ storage });