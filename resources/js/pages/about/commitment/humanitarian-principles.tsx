import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Heart, Users, Scale, Globe } from 'lucide-react'

export default function HumanitarianPrinciples() {
    const principles = [
        {
            id: 1,
            title: 'Humanity',
            icon: Heart,
            description:
                'Human suffering must be addressed wherever it is found, with particular attention to the most vulnerable.',
            commitment: [
                'Protecting life and health',
                'Ensuring respect for human beings',
                'Alleviating suffering wherever found',
                'Prioritizing the most vulnerable populations',
            ],
        },
        {
            id: 2,
            title: 'Impartiality',
            icon: Scale,
            description:
                'Humanitarian action must be carried out on the basis of need alone, without discrimination.',
            commitment: [
                'Providing assistance based solely on need',
                'No discrimination based on nationality, race, religion, class, or political views',
                'Prioritizing the most urgent cases of distress',
                'Ensuring equal access to services',
            ],
        },
        {
            id: 3,
            title: 'Neutrality',
            icon: Users,
            description:
                'Humanitarian actors must not take sides in hostilities or engage in controversies of a political, racial, religious, or ideological nature.',
            commitment: [
                'Maintaining independence from political agendas',
                'Not favoring any side in conflicts',
                'Focusing solely on humanitarian needs',
                'Operating without bias or preference',
            ],
        },
        {
            id: 4,
            title: 'Independence',
            icon: Globe,
            description:
                'Humanitarian action must be autonomous from political, economic, military, or other objectives.',
            commitment: [
                'Operating independently of government influence',
                'Making decisions based on humanitarian principles',
                'Maintaining organizational autonomy',
                'Ensuring freedom from external pressures',
            ],
        },
    ]

    return (
        <>
            <Head title="Commitment to Humanitarian Principles - VDO" />
            <div className="min-h-screen bg-white">
                <Header />

                {/* Hero Section */}
                <section
                    className="relative h-[50vh] overflow-hidden bg-gradient-to-br from-[#23369C] to-[#23369C]/80"
                    style={{
                        backgroundImage: 'url(/images/1.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay',
                    }}
                >
                    <div className="absolute inset-0 bg-[#23369C]/70" />
                    <div className="container relative z-10 mx-auto flex h-full items-center px-4">
                        <div className="max-w-3xl">
                            <h1 className="mb-4 text-5xl font-bold text-white">
                                Commitment to Humanitarian Principles
                            </h1>
                            <p className="text-xl text-white/90">
                                Upholding the core values that guide our
                                humanitarian work across Afghanistan
                            </p>
                        </div>
                    </div>
                </section>

                {/* Introduction */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            <div className="mb-16 text-center">
                                <h2 className="mb-6 text-3xl font-bold text-[#23369C]">
                                    Our Foundation
                                </h2>
                                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
                                    VDO is committed to upholding the
                                    fundamental humanitarian principles that form
                                    the foundation of all our work. These
                                    principles ensure that our assistance reaches
                                    those in need, regardless of who they are or
                                    where they are located, and that we remain
                                    independent, neutral, and impartial in all
                                    our operations.
                                </p>
                            </div>

                            {/* Four Principles */}
                            <div className="space-y-12">
                                {principles.map((principle, index) => (
                                    <div
                                        key={principle.id}
                                        className={`flex flex-col gap-8 rounded-3xl bg-gradient-to-br p-10 shadow-xl ${
                                            index % 2 === 0
                                                ? 'from-[#23369C]/5 to-[#00B7EC]/5 lg:flex-row'
                                                : 'from-[#00B7EC]/5 to-[#23369C]/5 lg:flex-row-reverse'
                                        }`}
                                    >
                                        {/* Icon & Title */}
                                        <div className="flex flex-col items-center lg:w-1/3">
                                            <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#00B7EC] to-[#23369C] shadow-2xl">
                                                <principle.icon className="h-16 w-16 text-white" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-[#23369C]">
                                                {principle.title}
                                            </h3>
                                        </div>

                                        {/* Content */}
                                        <div className="lg:w-2/3">
                                            <p className="mb-6 text-lg leading-relaxed text-gray-700">
                                                {principle.description}
                                            </p>
                                            <div className="rounded-xl bg-white p-6 shadow-lg">
                                                <h4 className="mb-4 font-semibold text-[#23369C]">
                                                    Our Commitment:
                                                </h4>
                                                <ul className="space-y-3">
                                                    {principle.commitment.map(
                                                        (item, idx) => (
                                                            <li
                                                                key={idx}
                                                                className="flex items-start gap-3"
                                                            >
                                                                <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00B7EC]">
                                                                    <svg
                                                                        className="h-3 w-3 text-white"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={
                                                                                3
                                                                            }
                                                                            d="M5 13l4 4L19 7"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                                <span className="text-gray-700">
                                                                    {item}
                                                                </span>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Implementation Section */}
                            <div className="mt-20 rounded-3xl bg-gradient-to-br from-[#23369C] to-[#23369C]/80 p-10 text-white shadow-2xl">
                                <h2 className="mb-8 text-center text-3xl font-bold">
                                    Implementation in Practice
                                </h2>
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                                        <h3 className="mb-4 text-xl font-bold">
                                            Staff Training
                                        </h3>
                                        <p className="leading-relaxed text-white/90">
                                            All VDO staff receive comprehensive
                                            training on humanitarian principles
                                            and their practical application in
                                            field operations.
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                                        <h3 className="mb-4 text-xl font-bold">
                                            Monitoring & Evaluation
                                        </h3>
                                        <p className="leading-relaxed text-white/90">
                                            We continuously monitor our programs
                                            to ensure adherence to humanitarian
                                            principles in all our interventions.
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                                        <h3 className="mb-4 text-xl font-bold">
                                            Accountability Mechanisms
                                        </h3>
                                        <p className="leading-relaxed text-white/90">
                                            Community feedback mechanisms ensure
                                            we remain accountable to the people
                                            we serve and uphold our principles.
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                                        <h3 className="mb-4 text-xl font-bold">
                                            Partnership Standards
                                        </h3>
                                        <p className="leading-relaxed text-white/90">
                                            We work only with partners who share
                                            our commitment to humanitarian
                                            principles and ethical practices.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    )
}
