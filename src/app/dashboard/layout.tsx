
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <div>Dashbaord{children}
        
      </div>
    </html>
  );
}
