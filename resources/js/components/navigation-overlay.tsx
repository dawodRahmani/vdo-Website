import { router } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function NavigationOverlay() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        let showTimer: ReturnType<typeof setTimeout> | null = null

        const removeStart = router.on('start', () => {
            // delay slightly so fast navigations don't flash an overlay
            showTimer = setTimeout(() => setVisible(true), 150)
        })

        const removeFinish = router.on('finish', () => {
            if (showTimer) {
                clearTimeout(showTimer)
                showTimer = null
            }
            setVisible(false)
        })

        return () => {
            if (showTimer) clearTimeout(showTimer)
            removeStart()
            removeFinish()
        }
    }, [])

    if (!visible) return null

    return (
        <div
            aria-live="polite"
            aria-busy="true"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
        >
            <div className="rounded-full bg-white p-4 shadow-2xl">
                <svg
                    className="h-10 w-10 animate-spin text-[rgb(0,175,239)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                    />
                    <path
                        d="M4 12a8 8 0 018-8"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    )
}
