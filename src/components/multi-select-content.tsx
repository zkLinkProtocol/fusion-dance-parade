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
            'md:h-[90px] h-[40px] w-[90px] cursor-pointer bg-[#1A1F24] text-lg rounded-xl font-bold hover:opacity-70 dark:border-white dark:bg-transparent dark:text-white relative',

            {
              '!cursor-not-allowed opacity-30': tag?.balance?.toString() === '0',
              'text-primary hover:text-primary bg-white hover:bg-white': !isSelectedTag(tag),
              'text-primary bg-whitebg-white border-4 border-solid border-indigo-500': isSelectedTag(tag),
            },
          )}
          style={{
            backgroundImage: `url(${`/assets/imgs/${tag.tokenId}.png`})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div
            className={cx(
              'font-normal absolute rounded-lg border top-1 right-2 text-sm border-solid border-indigo-400 bg-zinc-900 px-2',
              !tag.hasMint && !tag.isEligible && 'hidden',
            )}
          >
            {tag.hasMint ? tag.balance?.toString() : tag.isEligible ? '' : ''}
          </div>
        </li>
      ))}
    </>
  );
};

export default MultiSelectContent;
