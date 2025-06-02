import Footer from '@/components/frontend/Footer';
import Nav from '@/components/frontend/Nav';
import Providers from '@/components/frontend/Providers';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    //   <Toaster position="top-center" />
        <Providers>
          {/* <AuthKitProvider>
            <AuthProvider> */}
              {/* Move Nav inside AuthProvider */}
              <Nav />
              {children}
              <Footer />
            {/* </AuthProvider>
          </AuthKitProvider> */}
        </Providers>
);
