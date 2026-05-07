import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

const s3 = new S3Client({
  region: "ap-northeast-2"
});

export const s3Service = {

  async upload(file: Express.Multer.File, s3Dir: string): Promise<void> {
    try {
      // ❗ file.fieldname ❌ (이건 "files" 같은 key 이름임)
      // 👉 file.filename 써야함
      const key = `data/${s3Dir}/${file.filename}`;

      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: key,
        Body: fs.createReadStream(file.path), // 👉 파일 읽기
        ContentType: file.mimetype
      });

      await s3.send(command);

      // 👉 업로드 후 로컬 파일 삭제 (중요)
      fs.unlinkSync(file.path);

      // 👉 URL 반환 (DB 저장용)
    //   const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${key}`;

    //   return url;

    } catch (err) {
      console.error(err);
      throw new Error("s3 업로드 실패");
    }
  },


    async delete(imageUrl : string, s3Dir : string): Promise<boolean> {

    try {
      const key = `data/${s3Dir}/${imageUrl}`;
      const command = new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: key,
      });

      await s3.send(command);

      

      return true;

    } catch(err) {

      console.error(err);

      throw new Error("s3 삭제 실패");

    }

  }

};