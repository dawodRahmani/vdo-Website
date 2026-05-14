import PhotoStrip from '@/components/photo-strip'
import SiteLayout from '@/layouts/site-layout'
import { type SharedData } from '@/types'
import { router, usePage } from '@inertiajs/react'
import { Paperclip, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface HeroPhoto {
    src?: string
    url?: string
    alt?: string | null
}

interface CommitmentItem {
    id: number
    slug: string
    title: string
    body: string
    card_svg_url: string | null
}

interface Publication {
    id: number
    title: string
    cover_url: string | null
}

interface PageProps {
    heroPhotos?: HeroPhoto[]
    commitments?: CommitmentItem[]
    publications?: Publication[]
}

const defaultPhotos: HeroPhoto[] = [
    { src: '/Header and Gallary Photos/07.jpg', alt: 'Inclusive programs' },
    { src: '/Header and Gallary Photos/13.jpg', alt: 'Community accountability' },
    { src: '/Header and Gallary Photos/19.jpg', alt: 'Safeguarding and dignity' },
]

function photoSrc(p: HeroPhoto): string {
    return p.src ?? p.url ?? ''
}

function paragraphs(body: string): string[] {
    return body
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
}

interface ReportPageProps extends SharedData {
    errors: Record<string, string>
    flash?: {
        reportSent?: boolean
    }
}

export default function OurCommitmentPage({
    heroPhotos,
    commitments,
    publications,
}: PageProps) {
    const { props } = usePage<ReportPageProps>()
    const errors = props.errors ?? {}

    const photos =
        heroPhotos && heroPhotos.length > 0
            ? heroPhotos.map((p) => ({ src: photoSrc(p), alt: p.alt ?? '' }))
            : defaultPhotos.map((p) => ({
                  src: photoSrc(p),
                  alt: p.alt ?? '',
              }))

    const items = commitments ?? []
    const pubs = publications ?? []

    // Report form state
    const [subject, setSubject] = useState('')
    const [comment, setComment] = useState('')
    const [attachment, setAttachment] = useState<File | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [justSent, setJustSent] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (props.flash?.reportSent) {
            setJustSent(true)
            setSubject('')
            setComment('')
            setAttachment(null)
            if (fileInputRef.current) fileInputRef.current.value = ''
            const t = setTimeout(() => setJustSent(false), 6000)
            return () => clearTimeout(t)
        }
    }, [props.flash?.reportSent])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (submitting) return
        setSubmitting(true)
        const payload: Record<string, string | File> = {
            subject,
            comment,
        }
        if (attachment) payload.attachment = attachment

        router.post('/our-commitment/report', payload, {
            forceFormData: true,
            preserveScroll: true,
            onFinish: () => setSubmitting(false),
        })
    }

    const handlePickFile = () => fileInputRef.current?.click()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        setAttachment(file)
    }

    const clearAttachment = () => {
        setAttachment(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    return (
        <SiteLayout title="Our Commitment">
            <PhotoStrip photos={photos} />

            <div
                className="bg-gray-100"
                style={{
                    backgroundImage: 'url(/svg/Map.svg)',
                    backgroundSize: '100% auto',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Commitments + Form / Publications */}
                <section className="pt-6 pb-4">
                    <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-8 px-6 md:px-10 lg:grid-cols-2 lg:gap-12 lg:px-14">
                        {/* Left: Commitments grid + Make a Report form */}
                        <div>
                            <h2 className="mb-4 text-lg font-semibold text-[rgb(62,64,149)] md:text-xl">
                                Commitments:
                            </h2>
                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
                                {items.map((c) => (
                                    <a
                                        key={c.id}
                                        href={`#${c.slug}`}
                                        aria-label={c.title}
                                        className="block transition-transform hover:-translate-y-0.5"
                                    >
                                        {c.card_svg_url && (
                                            <img
                                                src={c.card_svg_url}
                                                alt={c.title}
                                                className="mx-auto h-auto w-full max-w-[150px] object-contain"
                                                draggable={false}
                                                loading="lazy"
                                            />
                                        )}
                                    </a>
                                ))}
                            </div>

                            {/* Make a Report form */}
                            <div className="mt-8">
                                <h3 className="mb-3 text-base font-semibold text-[rgb(62,64,149)] md:text-lg">
                                    Make a Report:
                                </h3>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-3"
                                    encType="multipart/form-data"
                                >
                                    <div className="flex items-center gap-3">
                                        <label
                                            htmlFor="report-subject"
                                            className="w-20 text-sm text-gray-700"
                                        >
                                            Subject:
                                        </label>
                                        <input
                                            id="report-subject"
                                            type="text"
                                            value={subject}
                                            onChange={(e) =>
                                                setSubject(e.target.value)
                                            }
                                            required
                                            className="flex-1 rounded border-0 bg-[rgb(189,191,193)]/40 px-3 py-1.5 text-sm focus:ring-2 focus:ring-[rgb(0,175,239)]/40 focus:outline-none"
                                        />
                                    </div>
                                    {errors.subject && (
                                        <p className="pl-20 text-xs text-red-600">
                                            {errors.subject}
                                        </p>
                                    )}
                                    <div className="flex items-start gap-3">
                                        <label
                                            htmlFor="report-comment"
                                            className="w-20 pt-1.5 text-sm text-gray-700"
                                        >
                                            Comment:
                                        </label>
                                        <textarea
                                            id="report-comment"
                                            rows={5}
                                            value={comment}
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                            required
                                            className="flex-1 resize-none rounded border-0 bg-[rgb(189,191,193)]/40 px-3 py-1.5 text-sm focus:ring-2 focus:ring-[rgb(0,175,239)]/40 focus:outline-none"
                                        />
                                    </div>
                                    {errors.comment && (
                                        <p className="pl-20 text-xs text-red-600">
                                            {errors.comment}
                                        </p>
                                    )}
                                    {attachment && (
                                        <div className="flex items-center justify-between gap-2 rounded bg-[rgb(189,191,193)]/30 px-3 py-1.5 pl-20 text-xs text-gray-700">
                                            <span className="truncate">
                                                <Paperclip className="mr-1 inline h-3 w-3 text-[rgb(0,175,239)]" />
                                                {attachment.name} ·{' '}
                                                {(
                                                    attachment.size / 1024
                                                ).toFixed(0)}{' '}
                                                KB
                                            </span>
                                            <button
                                                type="button"
                                                onClick={clearAttachment}
                                                aria-label="Remove attachment"
                                                className="rounded p-0.5 hover:bg-black/5"
                                            >
                                                <X className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    )}
                                    {errors.attachment && (
                                        <p className="pl-20 text-xs text-red-600">
                                            {errors.attachment}
                                        </p>
                                    )}
                                    {errors.report && (
                                        <p className="pl-20 text-xs text-red-600">
                                            {errors.report}
                                        </p>
                                    )}
                                    {justSent && (
                                        <p className="pl-20 text-xs text-green-700">
                                            Thanks — your report has been sent.
                                        </p>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.txt"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <div className="flex items-center justify-end gap-3 pl-20">
                                        <button
                                            type="button"
                                            onClick={handlePickFile}
                                            className="flex items-center gap-2 rounded border-0 bg-[rgb(189,191,193)]/40 px-4 py-1.5 text-sm text-gray-700 transition-colors hover:bg-[rgb(189,191,193)]/60"
                                        >
                                            {attachment
                                                ? 'Change attachment'
                                                : 'Attachment'}
                                            <Paperclip className="h-4 w-4 text-[rgb(0,175,239)]" />
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="rounded border-0 bg-[rgb(189,191,193)]/40 px-6 py-1.5 text-sm text-gray-700 transition-colors hover:bg-[rgb(189,191,193)]/60 disabled:opacity-60"
                                        >
                                            {submitting ? 'Sending…' : 'Send'}
                                        </button>
                                    </div>
                                    <p className="pl-20 text-[10px] text-gray-500">
                                        Optional attachment — PDF, DOC, image,
                                        or text. Max 5 MB.
                                    </p>
                                </form>
                            </div>
                        </div>

                        {/* Right: Publications */}
                        <div>
                            <h2 className="mb-4 text-lg font-semibold text-[rgb(62,64,149)] md:text-xl">
                                Publications:
                            </h2>
                            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                {pubs.map((pub) => (
                                    <div
                                        key={pub.id}
                                        className="mx-auto w-full max-w-[180px] rounded-sm border border-dashed border-gray-400 bg-white p-2 shadow-sm transition-shadow hover:shadow-md"
                                    >
                                        <div className="aspect-[3/4] w-full overflow-hidden bg-white">
                                            {pub.cover_url && (
                                                <img
                                                    src={encodeURI(
                                                        pub.cover_url,
                                                    )}
                                                    alt={pub.title}
                                                    className="h-full w-full object-contain"
                                                    loading="lazy"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Detailed sections */}
                {items.length > 0 && (
                    <section className="pb-14">
                        <div className="mx-auto max-w-[1240px] px-6 py-8 md:px-10 lg:px-14">
                            {items.map((c, i) => (
                                <div key={c.id}>
                                    <div
                                        id={c.slug}
                                        className="scroll-mt-24 pt-2"
                                    >
                                        <h2 className="text-base font-semibold text-[rgb(62,64,149)] md:text-lg">
                                            {c.title}:
                                        </h2>
                                        <div className="mt-2 space-y-1">
                                            {paragraphs(c.body).map(
                                                (line, j) => (
                                                    <p
                                                        key={j}
                                                        className="text-justify text-sm leading-relaxed text-gray-700 md:text-[15px]"
                                                    >
                                                        {line}
                                                    </p>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                    {i < items.length - 1 && (
                                        <hr className="my-6 border-0 border-t border-dashed border-[rgb(0,175,239)]" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </SiteLayout>
    )
}
