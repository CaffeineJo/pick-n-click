'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import supabase from '@/services/supabase';
import { Button } from '@/components/ui/button';

/**
 * 이미지 업로드 컴포넌트
 * - 외부에 onUpload로 이미지 URL 배열 전달
 * - 내부 상태는 컴포넌트에서 독립적으로 관리
 */
type ImageUploadProps = {
  /** 최종 이미지 URL들을 submit 시 form에 전달 */
  onUpload: (urls: string[]) => void;
  /** 최초 렌더 시 보여줄 이미지 (수정용) */
  defaultImages?: string[];
  /** Supabase 버킷 이름 */
  bucketName?: string;
};

export default function ImageUpload({
  onUpload,
  defaultImages = [],
  bucketName = 'item-img',
}: ImageUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  // 최초 마운트 시 defaultImages 설정
  useEffect(() => {
    if (defaultImages.length > 0) {
      setImages(defaultImages);
    }
  }, [defaultImages]);
  // 외부에 이미지 목록 전달 (최초 마운트는 제외)
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);

    const newUrls: string[] = [];

    for (const file of selectedFiles) {
      const fileExt = file.name.split('.').pop();
      const filePath = `uploads/${crypto.randomUUID()}.${fileExt}`;

      const { error } = await supabase.storage.from(bucketName).upload(filePath, file);
      if (error) {
        console.error('Upload error:', error);
        continue;
      }

      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      if (data?.publicUrl) {
        newUrls.push(data.publicUrl);
      }
    }

    const updatedImages = [...images, ...newUrls];
    setImages(updatedImages);
    onUpload(updatedImages);
    setSelectedFiles([]);
    setUploading(false);
  };

  const handleRemoveImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
    onUpload(updated);
  };
  return (
    <div className="space-y-4">
      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={uploading || selectedFiles.length === 0}>
        {uploading ? '업로드 중...' : '이미지 업로드'}
      </Button>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {images.map((url, index) => (
          <div key={url} className="relative">
            <Image
              src={url}
              alt={`이미지 ${index + 1}`}
              width={300}
              height={200}
              style={{ objectFit: 'contain' }}
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute right-2 top-2"
              onClick={() => handleRemoveImage(index)}
            >
              X
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
