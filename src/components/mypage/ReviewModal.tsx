'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { addReview } from '@/api/reviewsApi';
import Image from 'next/image';

const ReviewModal = ({
  title,
  reviewId,
  imgSrc,
  written,
}: {
  title: string;
  reviewId: number;
  imgSrc: string;
  written: boolean;
}) => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleReviewUpload = async () => {
    await addReview({ id: reviewId, content: text });
    setOpen(false);
  };

  return (
    <div className="mt-20">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setOpen(true)}>
            {written ? '후기 수정' : '후기 작성'}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">후기 작성</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              구매하신 상품은 어떠셨나요? 제품의 좋았던 점, 아쉬웠던 점도 솔직하게 얘기해주세요.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-400">
                <Image
                  src={imgSrc}
                  alt={imgSrc}
                  className="h-full w-full rounded-lg object-cover"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground"></p>
              </div>
            </div>

            <div>
              <label htmlFor="reviewText" className="block text-sm font-medium">
                후기 내용
              </label>
              <Textarea
                value={text}
                onChange={handleChange}
                maxLength={5000}
                id="reviewText"
                placeholder="최대 5000자까지 작성 가능합니다."
                className="mt-1"
                rows={5}
              />
              <p className="text-right text-sm text-gray-500">{text.length} / 5000</p>
            </div>

            <div className="rounded-md bg-gray-50 p-3 text-left text-sm">
              <ul className="mt-1 list-disc pl-2 text-xs leading-relaxed text-gray-500">
                <li>
                  상품과 무관하거나 반복되는 동일 단어/문장을 사용하여 후기로 볼 수 없는 글,
                  판매자와 고객의 후기 이용을 방해한다고 판단되는 경우, 음란 및 부적절하거나
                  불법적인 내용은 통보없이 삭제될 수 있습니다.
                </li>
                <li>
                  전화번호, 이메일, 주소, 계좌번호 등 개인정보가 노출되지 않도록 주의해주세요.
                </li>
              </ul>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button variant="outline" className="mr-2" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button variant="default" onClick={handleReviewUpload}>
              등록
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewModal;
