import cx from 'classnames';

type TProps = {
  onClick: (tag: string) => void;
  isSelectedTag: (tag: string) => boolean;
  tags: string[];
};

const MultiSelectContent: React.FC<TProps> = ({ onClick, isSelectedTag, tags = [] }) => {
  return (
    <>
      <div className='mt-20 inline-flex w-full flex-nowrap overflow-x-auto overflow-y-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]'>
        <ul className='animate-infinite-scroll flex items-center justify-center bg-[#1A1F24] py-4 md:justify-start [&_img]:max-w-none [&_li]:mx-8'>
          {tags.map((tag) => (
            <li
              key={tag}
              onClick={() => onClick(tag)}
              className={cx(
                'h-[290px] w-[290px] cursor-pointer bg-[#1A1F24] text-lg font-bold hover:opacity-70 dark:border-white dark:bg-transparent dark:text-white',
                {
                  'cursor-not-allowed opacity-30': isSelectedTag(tag),
                  'text-primary hover:border-primary hover:text-primary bg-white hover:bg-white': !isSelectedTag(tag),
                },
              )}
              style={{
                backgroundImage: `url(${tag?.nft?.image})`,
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            >
              {isSelectedTag(tag) && (
                <div className='flex max-w-[218px] justify-between gap-5 whitespace-nowrap text-base font-bold leading-6 tracking-tight'>
                  <div className='justify-center rounded-none bg-black px-3 py-3.5 text-white'>{tag.nft.name}</div>
                  <div className='items-start justify-center rounded-lg bg-black px-3 py-3.5 text-right text-teal-500'>
                    {tag.tokenId}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MultiSelectContent;
