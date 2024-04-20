import cx from 'classnames';

type TProps = {
  onClick: (tag: string) => void;
  isSelectedTag: (tag: string) => boolean;
  tags: string[];
};

const MultiSelectContent: React.FC<TProps> = ({ onClick, isSelectedTag, tags = [] }) => {
  return (
    <>
      {tags.map((tag) => (
        <li
          key={tag.tokenId}
          onClick={() => {
            if (tag?.balance?.toString() === '0') return;
            onClick(tag);
          }}
          className={cx(
            'h-[90px] w-[90px] cursor-pointer bg-[#1A1F24] text-lg font-bold hover:opacity-70 dark:border-white dark:bg-transparent dark:text-white',
            {
              '!cursor-not-allowed opacity-30': isSelectedTag(tag) || tag?.balance?.toString() === '0',
              'text-primary hover:border-primary hover:text-primary bg-white hover:bg-white': !isSelectedTag(tag),
            },
          )}
          style={{
            backgroundImage: `url(${`/assets/imgs/${tag.type}.png`})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          {tag.balance.toString()}
          {isSelectedTag(tag) && (
            <div className='flex max-w-[218px] justify-between gap-5 whitespace-nowrap text-base font-bold leading-6 tracking-tight'>
              <div className='justify-center rounded-none bg-black px-3 py-3.5 text-white'>{tag.name}</div>
              <div className='items-start justify-center rounded-lg bg-black px-3 py-3.5 text-right text-teal-500'>
                {tag.tokenId}
              </div>
            </div>
          )}
        </li>
      ))}
    </>
  );
};

export default MultiSelectContent;
