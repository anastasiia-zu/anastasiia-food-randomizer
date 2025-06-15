import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
   api_key: process.env.CLOUDINARY_API_KEY!,
   api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// распарсить чтобы сохранить в клауд
function bufferToStream(buffer: Buffer): Readable {
   const readable = new Readable();

   readable.push(buffer);
   readable.push(null);

   return readable;
};

export async function POST(req: NextRequest) {
   const formData = await req.formData();
   const file = formData.get("file") as File;

   if (!file) {
      return NextResponse.json({error: "no file providet"}, {status: 400})
   };

   const arrayBuffer = await file.arrayBuffer();
   const buffer = Buffer.from(arrayBuffer);

   try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uploadResult = await new Promise<any>((resolve, reject) => {
         const stream = cloudinary.uploader.upload_stream(
            { folder: "recipes" },
            (error, result) => {
               if (error) {
                  return reject(error);
               }
               resolve(result);
            }
         )

         bufferToStream(buffer).pipe(stream);
      })

      return NextResponse.json({url: uploadResult.secure_url});
   } catch(error) {
      console.error("cloudinary upload error", error);

      return NextResponse.json({error: "upload failed"}, {status: 500});
   };

};