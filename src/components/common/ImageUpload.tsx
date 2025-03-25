'use client';

import { useState } from 'react';
import Image from 'next/image';
import supabase from '@/services/supabase';
import { Button } from '@/components/ui/button';

type ImageUploadProps = {
  onUpload: (urls: string[]) => void;
};

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);

    const urls: string[] = [];

    for (const file of selectedFiles) {
      // 파일 확장자 추출 및 고유 파일명 생성
      const fileExt = file.name.split('.').pop();
      const randomUUID: string = crypto.randomUUID();

      const fileName = `${randomUUID}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('item-img').upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue;
      }

      // 업로드 후 공개 URL 가져오기
      const { data } = supabase.storage.from('item-img').getPublicUrl(filePath);
      if (data?.publicUrl) {
        urls.push(data.publicUrl);
      }
    }

    setUploadedUrls(urls);
    onUpload(urls);
    setUploading(false);
  };
  return (
    <div className="space-y-4">
      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={uploading}>
        {uploading ? '업로드 중...' : '이미지 업로드'}
      </Button>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {uploadedUrls.map((url, index) => (
          <div key={index} className="w-full">
            <Image
              src={url}
              alt={`업로드 이미지 ${index + 1}`}
              width={300}
              height={150}
              style={{ objectFit: 'contain' }}
            />
            &nbsp;
          </div>
        ))}
      </div>
    </div>
  );
}
