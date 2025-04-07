import { ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
}

const MainContent = ({ children }: MainContentProps) => {
  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </div>
  );
};

export default MainContent;
