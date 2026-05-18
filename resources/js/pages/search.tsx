import SiteLayout from '@/layouts/site-layout'
import { Link, router } from '@inertiajs/react'
import { Search } from 'lucide-react'
import { useState } from 'react'

interface SearchHit {
    title: string
    snippet: string
    badge?: string | null
    url: string
}

interface SearchGroup {
    label: string
    items: SearchHit[]
}

interface SearchProps {
    q?: string
    groups?: SearchGroup[]
    totalCount?: number
}

export default function SearchResults({
    q = '',
    groups = [],
    totalCount = 0,
}: SearchProps) {
    const [query, setQuery] = useState(q)

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.visit(`/search?q=${encodeURIComponent(query.trim())}`)
    }

    return (
        <SiteLayout title={q ? `Search: ${q}` : 'Search'}>
            <section className="mx-auto max-w-[1240px] px-6 py-10 md:px-10 lg:px-14">
                <h1 className="mb-4 text-2xl font-semibold text-[rgb(62,64,149)] md:text-3xl">
                    Search
                </h1>

                <form
                    onSubmit={submit}
                    className="mb-6 flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-sm"
                >
                    <Search className="h-4 w-4 flex-none text-gray-400" />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search the site…"
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="rounded-md bg-[rgb(0,175,239)] px-3 py-1.5 text-sm font-medium text-white hover:bg-[rgb(0,175,239)]/90"
                    >
                        Search
                    </button>
                </form>

                {q && q.length >= 2 && totalCount === 0 && (
                    <p className="rounded-md border border-dashed border-gray-300 bg-white p-6 text-center text-sm text-gray-500">
                        No matches found for{' '}
                        <span className="font-medium">“{q}”</span>.
                    </p>
                )}

                {q && q.length < 2 && (
                    <p className="text-sm text-gray-600">
                        Type at least 2 characters to search.
                    </p>
                )}

                {totalCount > 0 && (
                    <p className="mb-4 text-sm text-gray-600">
                        {totalCount}{' '}
                        {totalCount === 1 ? 'result' : 'results'} for{' '}
                        <span className="font-medium">“{q}”</span>
                    </p>
                )}

                <div className="space-y-8">
                    {groups.map((group) => (
                        <section
                            key={group.label}
                            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                        >
                            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[rgb(62,64,149)]">
                                {group.label}
                            </h2>
                            <ul className="divide-y divide-gray-100">
                                {group.items.map((hit, i) => (
                                    <li key={i}>
                                        <Link
                                            href={hit.url}
                                            className="block py-3 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {hit.title}
                                                </span>
                                                {hit.badge && (
                                                    <span className="inline-flex items-center rounded-full bg-[rgb(0,175,239)]/10 px-2 py-0.5 text-[10px] font-medium text-[rgb(0,175,239)]">
                                                        {hit.badge}
                                                    </span>
                                                )}
                                            </div>
                                            {hit.snippet && (
                                                <p className="mt-1 line-clamp-2 text-xs text-gray-600">
                                                    {hit.snippet}
                                                </p>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}
                </div>
            </section>
        </SiteLayout>
    )
}
