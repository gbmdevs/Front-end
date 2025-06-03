interface DashboardLayoutProps {
  children: React.ReactNode;
}


const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
       {children}
    </main>
  )
}

export default DashboardLayout;