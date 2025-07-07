import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { fetchCart } from './lib/api/cart';
const queryClient = new QueryClient()

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        queryClient.prefetchQuery({
            queryKey: ['cart'],
            queryFn: fetchCart,
        });

        root.render(
            <QueryClientProvider client={queryClient}>
                <App {...props} />
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        );
    },
    progress: {
        color: '#4B5563',
        showSpinner: false,
    },
});

// This will set light / dark mode on load...
initializeTheme();
