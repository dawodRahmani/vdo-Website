import { Link } from '@inertiajs/react';

export interface CommitmentItem {
    id?: number;
    title: string;
    svg?: string;
    svg_url?: string;
    crop_scale?: number;
    crop_offset_x?: number;
    crop_offset_y?: number;
}

const defaultRow1: CommitmentItem[] = [
    { title: 'Gender Equality & Women Empowerment', svg: '/Home Page/H1.svg' },
    {
        title: 'Safeguarding, PSEAH & Child Protection',
        svg: '/Home Page/H2.svg',
    },
    { title: 'Accountability to Affected People', svg: '/Home Page/H3.svg' },
    { title: 'Do No Harm & Conflict Sensitivity', svg: '/Home Page/H4.svg' },
    { title: 'Protection Mainstreaming', svg: '/Home Page/H5.svg' },
    {
        title: 'Inclusion of Person with Disabilities',
        svg: '/Home Page/H6.svg',
    },
];

const defaultRow2: CommitmentItem[] = [
    {
        title: 'Environmental Sustainability & Climate Sensitivity',
        svg: '/Home Page/H7.svg',
    },
    { title: 'Localization & Community Ownership', svg: '/Home Page/H8.svg' },
    {
        title: 'Data Protection & Ethical Information Management',
        svg: '/Home Page/H9.svg',
    },
    {
        title: 'Anti-Fraud, Anti-Corruption & Aid Diversion Protection',
        svg: '/Home Page/H10.svg',
    },
    { title: 'MEAL & Evidence-Based Programming', svg: '/Home Page/H11.svg' },
    { title: 'Equity, Diversity & Inclusion (EDI)', svg: '/Home Page/H12.svg' },
];

function itemSrc(c: CommitmentItem): string {
    return c.svg_url || c.svg || '';
}

function CommitmentRow({
    items,
    lineGap,
}: {
    items: CommitmentItem[];
    lineGap: number;
}) {
    return (
        <div className="relative">
            <div className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
                {items.map((item) => {
                    const scale = (item.crop_scale ?? 100) / 100;
                    const ox = item.crop_offset_x ?? 0;
                    const oy = item.crop_offset_y ?? 0;
                    return (
                        <Link
                            key={item.id ?? item.title}
                            href="/our-commitment"
                            className="flex flex-col items-center px-1 text-center transition-transform hover:-translate-y-0.5"
                        >
                            <div className="relative h-20 w-20 overflow-hidden md:h-24 md:w-24 lg:h-28 lg:w-28">
                                <img
                                    src={encodeURI(itemSrc(item))}
                                    alt={item.title}
                                    className="absolute left-1/2 top-1/2 h-full w-full max-h-none max-w-none object-contain"
                                    style={{
                                        transform: `translate(-50%, -50%) translate(${ox}px, ${oy}px) scale(${scale})`,
                                        transformOrigin: 'center',
                                    }}
                                    loading="lazy"
                                />
                            </div>
                            <span className="mt-2 line-clamp-3 text-xs font-medium leading-snug text-[rgb(62,64,149)] md:text-sm">
                                {item.title}
                            </span>
                        </Link>
                    );
                })}
            </div>

            {/* Dotted timeline with square markers */}
            <div
                className="relative hidden md:block"
                style={{ marginTop: `${lineGap}px` }}
            >
                <div
                    className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle, rgb(0,175,239) 1px, transparent 1px)',
                        backgroundSize: '10px 2px',
                        backgroundRepeat: 'repeat-x',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="relative grid grid-cols-6">
                    {items.map((item) => (
                        <div key={item.id ?? item.title} className="flex justify-center">
                            <span className="h-2 w-2 border border-[rgb(0,175,239)] bg-white" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

interface Props {
    commitments?: CommitmentItem[];
    lineGap?: number;
}

export default function OurCommitment({ commitments, lineGap }: Props) {
    const all = commitments && commitments.length > 0 ? commitments : [...defaultRow1, ...defaultRow2];
    const mid = Math.ceil(all.length / 2);
    const row1 = all.slice(0, mid);
    const row2 = all.slice(mid);
    const gap = lineGap ?? -12;

    return (
        <section className="bg-[rgb(245,245,245)] py-10 md:py-12">
            <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                <h2 className="mb-8 text-left text-lg font-bold text-[rgb(0,175,239)] md:text-xl">
                    Our Commitment:
                </h2>

                <div className="space-y-8">
                    <CommitmentRow items={row1} lineGap={gap} />
                    {row2.length > 0 && <CommitmentRow items={row2} lineGap={gap} />}
                </div>
            </div>
        </section>
    );
}
