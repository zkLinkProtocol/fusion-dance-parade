import cx from 'classnames';
import { useAssetPath } from 'hoc/withImagePath';

type TProps = {
  onClick: (tag: string) => void;
  isSelectedTag: (tag: string) => boolean;
  tags: string[];
};

const MultiSelectContent: React.FC<TProps> = ({ onClick, isSelectedTag, tags = [] }) => {
  const getAssetPath = useAssetPath();
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
            'md:h-[90px] h-[40px] md:w-[90px] w-[40px] cursor-pointer bg-[#1A1F24] text-lg rounded-xl font-bold hover:opacity-70 dark:border-white dark:bg-transparent dark:text-white relative',

            {
              '!cursor-not-allowed opacity-30': tag?.balance?.toString() === '0',
              'text-primary hover:text-primary bg-white hover:bg-white': !isSelectedTag(tag),
              'text-primary bg-whitebg-white border-4 border-solid border-indigo-500': isSelectedTag(tag),
            },
          )}
          style={{
            backgroundImage: `url(${getAssetPath(`/assets/imgs/${tag.tokenId}.png`)})`,
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div
            className={cx(
              'font-normal absolute rounded-lg border md:top-1 top-0 md:right-2 right-1 md:text-sm text-xs border-solid border-indigo-400 bg-zinc-900 md:px-2 px-1',
              !tag.hasMint && 'hidden',
            )}
          >
            {tag.hasMint ? tag.balance?.toString() : ''}
          </div>
        </li>
      ))}
    </>
  );
};

export default MultiSelectContent;
