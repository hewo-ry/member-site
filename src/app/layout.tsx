// TODO: font
import { Metadata } from 'next';
import { Suspense } from 'react';

import NavigationTracker from '@/components/navigation-tracker';
import { getAssociationById } from '@/lib/association';
import '@/styles/globals.css';
import '@/theme/active.css';

export const generateMetadata = async (): Promise<Metadata> => {
    const { data: association } = await getAssociationById();

    return association
        ? {
              title: {
                  template: `%s - ${association.name}`,
                  default: association.name,
              },
              description: association.description,
          }
        : {};
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => (
    <html lang='fi'>
        <body className='antialiased'>
            <Suspense fallback={null}>
                <NavigationTracker />
            </Suspense>
            {children}
        </body>
    </html>
);

export default RootLayout;
