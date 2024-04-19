import { Navbar } from '../ui/navbar';

type TProps = {
  children: React.ReactNode;
};

export const BaseLayout: React.FC<TProps> = ({ children }) => {
  return (
    <div
      vaul-drawer-wrapper=''
      className='!overflow-y-auto overflow-x-hidden pt-navigation-height mobile:h-screen mobile:min-h-screen mobile:pb-navigation-height mobile:pt-0'
    >
      <div className='fixed inset-x-0 top-0 z-10 w-full mobile:sticky'>
        <Navbar />
      </div>
      {children}
    </div>
  );
};
