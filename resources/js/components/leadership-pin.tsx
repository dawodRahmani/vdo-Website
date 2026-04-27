import { icons } from 'lucide-react'

export type PinStyle = 'balloon' | 'icon' | 'image'

export interface LeadershipPinProps {
    color: string
    pinStyle: PinStyle
    iconName?: string | null
    iconImageUrl?: string | null
}

export function LeadershipPin({
    color,
    pinStyle,
    iconName,
    iconImageUrl,
}: LeadershipPinProps) {
    if (pinStyle === 'image' && iconImageUrl) {
        return (
            <div className="relative flex flex-col items-center">
                <div
                    className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full ring-4"
                    style={{ borderColor: color, ['--tw-ring-color' as string]: color }}
                >
                    <img
                        src={iconImageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
                <span
                    className="-mt-1 h-2.5 w-2.5 rounded-full border-2 bg-white"
                    style={{ borderColor: color }}
                />
            </div>
        )
    }

    if (pinStyle === 'icon' && iconName) {
        const LucideIcon = (icons as Record<string, React.ComponentType<{ className?: string }>>)[iconName]
        if (LucideIcon) {
            return (
                <div className="relative flex flex-col items-center">
                    <div
                        className="flex h-20 w-20 items-center justify-center rounded-full text-white"
                        style={{ backgroundColor: color }}
                    >
                        <LucideIcon className="h-10 w-10" />
                    </div>
                    <span
                        className="-mt-1 h-2.5 w-2.5 rounded-full border-2 bg-white"
                        style={{ borderColor: color }}
                    />
                </div>
            )
        }
    }

    return (
        <div className="relative flex flex-col items-center">
            <svg
                viewBox="0 0 56 80"
                className="h-20 w-14 drop-shadow-md"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M28 14 C16.95 14 8 22.95 8 34 c0 5.6 2.3 10.67 6 14.3 L28 70 L42 48.3 C45.7 44.67 48 39.6 48 34 C48 22.95 39.05 14 28 14 Z"
                    fill={color}
                />
                <circle cx="28" cy="20" r="14" fill={color} fillOpacity="0.55" />
            </svg>
            <span
                className="-mt-1 h-2.5 w-2.5 rounded-full border-2 bg-white"
                style={{ borderColor: color }}
            />
        </div>
    )
}
