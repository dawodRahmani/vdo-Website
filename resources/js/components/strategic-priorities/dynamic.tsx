import { type ReactNode } from 'react'

export interface SpInfographicSlot {
    url: string
    alt: string | null
    scale: number
    offset_x: number
    offset_y: number
}

export interface SpInfographics {
    infographic: SpInfographicSlot
    beneficiary: SpInfographicSlot
    extra: SpInfographicSlot
}

export interface SpContent {
    page_key: string
    heading?: string | null
    body?: string | null
    between_body?: string | null
    infographic_url?: string | null
    infographic_alt?: string | null
    achievements_heading?: string | null
    beneficiary_url?: string | null
    beneficiary_alt?: string | null
    infographics?: SpInfographics
    bullets?: string[]
}

export function paragraphs(value: string | null | undefined): string[] {
    if (!value) return []
    return value
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0)
}

// Render text with **bold** markers as <strong> spans in brand color.
export function renderRich(text: string): ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={i} className="text-[rgb(62,64,149)]">
                    {part.slice(2, -2)}
                </strong>
            )
        }
        return <span key={i}>{part}</span>
    })
}

export function pickHeading(value: string | null | undefined, fallback: string): string {
    return value && value.trim().length > 0 ? value : fallback
}

export function pickBody(value: string | null | undefined, fallback: string): string {
    return value && value.trim().length > 0 ? value : fallback
}

export function pickImage(
    value: string | null | undefined,
    fallback: string,
): string {
    return value && value.trim().length > 0 ? value : fallback
}

export function pickBullets(value: string[] | undefined, fallback: string[]): string[] {
    return value && value.length > 0 ? value : fallback
}
