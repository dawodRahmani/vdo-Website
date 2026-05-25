import { type SpInfographicSlot } from './dynamic'

interface Props {
    slot?: SpInfographicSlot
    fallbackUrl?: string
    fallbackAlt?: string
    /** Tailwind classes applied to the framing wrapper. Controls the outer
     *  width/margins of the rendered image — kept identical whether or not
     *  scale/offset are active so the surrounding layout doesn't shift. */
    wrapperClassName?: string
    /** CSS class(es) applied to the inner <img>. Use this for sizing like
     *  `w-full h-auto` or `w-[210px]`. */
    imgClassName?: string
}

export function ManagedInfographic({
    slot,
    fallbackUrl,
    fallbackAlt,
    wrapperClassName = '',
    imgClassName = 'h-auto w-full object-contain',
}: Props) {
    const url = slot?.url || fallbackUrl || ''
    const alt = slot?.alt ?? fallbackAlt ?? ''
    const scale = (slot?.scale ?? 100) / 100
    const offsetX = slot?.offset_x ?? 0
    const offsetY = slot?.offset_y ?? 0

    if (!url) return null

    const hasTransform = scale !== 1 || offsetX !== 0 || offsetY !== 0
    const img = <img src={url} alt={alt} className={imgClassName} />

    if (!hasTransform) {
        // No admin adjustments — render exactly as if it were a plain <img>,
        // no extra wrappers, no overflow rules, no aspect ratio forced.
        return wrapperClassName ? <div className={wrapperClassName}>{img}</div> : img
    }

    return (
        <div className={wrapperClassName}>
            <div
                style={{
                    transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
                    transformOrigin: 'center center',
                }}
            >
                {img}
            </div>
        </div>
    )
}
