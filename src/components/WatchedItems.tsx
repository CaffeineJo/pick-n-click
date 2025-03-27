import React from 'react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Item } from '@/types/cartType';
import Link from 'next/link';

type WatchedItemsProps = {
  items: Item[];
};

const WatchedItems = ({ items }: WatchedItemsProps) => {
  return (
    <div>
      <ScrollArea className="w-30 h-72 rounded-md">
        <div className="p-4">
          {items.map((item) => (
            <React.Fragment key={item.item_id}>
              <div className="mb-2">
                <Link href={`/detail/${item.item_id}`}>
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                </Link>
              </div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default WatchedItems;
