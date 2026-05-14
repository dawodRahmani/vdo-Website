import { useEffect, useRef, useState } from 'react'
import { router } from '@inertiajs/react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Search } from 'lucide-react'

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

interface SearchResponse {
    groups: SearchGroup[]
    totalCount?: number
}

export function GlobalSearch() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [groups, setGroups] = useState<SearchGroup[]>([])
    const [loading, setLoading] = useState(false)
    const abortRef = useRef<AbortController | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Cmd/Ctrl+K to open
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                setOpen((v) => !v)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    // Reset when closed; focus input when opened
    useEffect(() => {
        if (!open) {
            setQuery('')
            setGroups([])
            abortRef.current?.abort()
            return
        }
        // Slight delay so Radix has mounted the input
        const t = setTimeout(() => inputRef.current?.focus(), 30)
        return () => clearTimeout(t)
    }, [open])

    // Debounced fetch
    useEffect(() => {
        const q = query.trim()
        if (q.length < 2) {
            setGroups([])
            return
        }
        const timer = setTimeout(() => {
            abortRef.current?.abort()
            const ctrl = new AbortController()
            abortRef.current = ctrl
            setLoading(true)
            fetch(`/admin/search?q=${encodeURIComponent(q)}`, {
                signal: ctrl.signal,
                headers: { Accept: 'application/json' },
            })
                .then((r) => r.json() as Promise<SearchResponse>)
                .then((data) => setGroups(data.groups ?? []))
                .catch((err) => {
                    if ((err as Error).name !== 'AbortError') console.error(err)
                })
                .finally(() => setLoading(false))
        }, 200)
        return () => clearTimeout(timer)
    }, [query])

    const go = (url: string) => {
        setOpen(false)
        router.visit(url)
    }

    const totalCount = groups.reduce((acc, g) => acc + g.items.length, 0)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-foreground"
                    aria-label="Open global search"
                >
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Search…</span>
                    <kbd className="ml-2 hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
                        Ctrl K
                    </kbd>
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0 sm:max-w-2xl">
                <DialogTitle className="sr-only">Global search</DialogTitle>
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                    <Search className="h-4 w-4 flex-none text-muted-foreground" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search across all editable content…"
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                    {loading && (
                        <span className="text-[10px] text-muted-foreground">
                            …
                        </span>
                    )}
                </div>
                <div className="max-h-[60vh] overflow-y-auto">
                    {query.trim().length < 2 ? (
                        <div className="p-8 text-center text-sm text-muted-foreground">
                            Type at least 2 characters to search.
                        </div>
                    ) : groups.length === 0 && !loading ? (
                        <div className="p-8 text-center text-sm text-muted-foreground">
                            No matches found.
                        </div>
                    ) : (
                        <div className="divide-y divide-border">
                            {groups.map((group) => (
                                <div key={group.label} className="py-1">
                                    <div className="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                        {group.label}
                                    </div>
                                    {group.items.map((hit, i) => (
                                        <button
                                            key={`${group.label}-${i}`}
                                            type="button"
                                            onClick={() => go(hit.url)}
                                            className="flex w-full flex-col gap-1 px-4 py-2 text-left transition-colors hover:bg-accent"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-foreground">
                                                    {hit.title}
                                                </span>
                                                {hit.badge && (
                                                    <span className="inline-flex items-center rounded-full bg-[rgb(0,175,239)]/10 px-2 py-0.5 text-[10px] font-medium text-[rgb(0,175,239)]">
                                                        {hit.badge}
                                                    </span>
                                                )}
                                            </div>
                                            {hit.snippet && (
                                                <p className="line-clamp-2 text-xs text-muted-foreground">
                                                    {hit.snippet}
                                                </p>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {totalCount > 0 && (
                    <div className="border-t border-border bg-muted/50 px-4 py-2 text-[10px] text-muted-foreground">
                        {totalCount}{' '}
                        {totalCount === 1 ? 'result' : 'results'} — press Enter
                        on a row or click to open
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
