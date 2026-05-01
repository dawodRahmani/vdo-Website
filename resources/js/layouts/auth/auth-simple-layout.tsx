import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative flex min-h-svh items-center justify-center bg-gray-100 p-6 md:p-10">
            {/* Brand gradient accent */}
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[rgb(0,175,239)] via-[rgb(62,64,149)] to-[rgb(0,175,239)]" />

            <div className="w-full max-w-md">
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200/60">
                    {/* Header band */}
                    <div className="bg-[rgb(62,64,149)] px-8 pb-6 pt-8 text-center">
                        <Link
                            href={home()}
                            className="inline-flex flex-col items-center gap-3"
                        >
                            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-2 shadow-md">
                                <img
                                    src="/svg/logo.png"
                                    alt="VDO Logo"
                                    className="h-full w-full object-contain"
                                />
                            </span>
                            <span className="sr-only">Vision Development Organization</span>
                        </Link>
                        <h1 className="mt-4 text-xl font-bold text-white">
                            {title}
                        </h1>
                        {description && (
                            <p className="mt-1 text-sm text-white/80">
                                {description}
                            </p>
                        )}
                    </div>

                    {/* Form body — force light theme so inputs stay readable */}
                    <div className="px-8 py-8 text-gray-900 [&_input]:bg-white [&_input]:text-gray-900 [&_input]:placeholder:text-gray-400 [&_label]:text-gray-700 [&_a]:text-[rgb(0,175,239)]">
                        {children}
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} Vision Development Organization
                </p>
            </div>
        </div>
    );
}
