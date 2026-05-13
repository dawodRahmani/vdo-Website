import { Link } from '@inertiajs/react';

interface CommitmentItem {
    title: string;
    svg: string;
}

const row1: CommitmentItem[] = [
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

const row2: CommitmentItem[] = [
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

function CommitmentRow({ items }: { items: CommitmentItem[] }) {
    return (
        <div className="relative">
            <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
                {items.map((item) => (
                    <Link
                        key={item.title}
                        href="/our-commitment"
                        className="flex justify-center px-1 transition-transform hover:-translate-y-0.5"
                    >
                        <img
                            src={encodeURI(item.svg)}
                            alt={item.title}
                            className="h-24 w-24 object-contain md:h-28 md:w-28 lg:h-32 lg:w-32"
                            loading="lazy"
                        />
                    </Link>
                ))}
            </div>

            {/* Dotted timeline with square markers */}
            <div className="relative -mt-3 hidden md:block lg:-mt-4">
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
                        <div key={item.title} className="flex justify-center">
                            <span className="h-2 w-2 border border-[rgb(0,175,239)] bg-white" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function OurCommitment() {
    return (
        <section className="bg-gray-100 py-10 md:py-12">
            <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-14">
                <h2 className="mb-8 text-left text-lg font-bold text-[rgb(0,175,239)] md:text-xl">
                    Our Commitment:
                </h2>

                <div className="space-y-8">
                    <CommitmentRow items={row1} />
                    <CommitmentRow items={row2} />
                </div>
            </div>
        </section>
    );
}
