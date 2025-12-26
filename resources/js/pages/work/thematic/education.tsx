import { Head } from '@inertiajs/react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { BookOpen, GraduationCap, Users, School } from 'lucide-react'

export default function Education() {
    return (
        <>
            <Head title="Education - VDO" />
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
                                Education
                            </h1>
                            <p className="text-xl text-white/90">
                                Empowering communities through quality education and lifelong learning opportunities
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="mx-auto max-w-5xl">
                            {/* Overview */}
                            <div className="mb-16">
                                <h2 className="mb-6 text-3xl font-bold text-[#23369C]">
                                    Our Approach to Education
                                </h2>
                                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                                    Education is the foundation of sustainable development. VDO believes that every child,
                                    regardless of gender, location, or socioeconomic status, deserves access to quality education.
                                    Our comprehensive education programs focus on improving access, enhancing quality, and
                                    promoting inclusive learning environments across Afghanistan.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-700">
                                    We work closely with communities, government institutions, and international partners to
                                    strengthen the education system and create lasting positive change in the lives of students
                                    and their families.
                                </p>
                            </div>

                            {/* Key Areas */}
                            <div className="mb-16">
                                <h2 className="mb-8 text-3xl font-bold text-[#23369C]">
                                    Key Focus Areas
                                </h2>
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <School className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Community-Based Education
                                        </h3>
                                        <p className="text-gray-600">
                                            Establishing community-based schools in remote areas to ensure children,
                                            especially girls, have access to education close to their homes.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <GraduationCap className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Teacher Training
                                        </h3>
                                        <p className="text-gray-600">
                                            Comprehensive training programs for teachers to improve teaching methodologies,
                                            classroom management, and student engagement.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <BookOpen className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Accelerated Learning Programs
                                        </h3>
                                        <p className="text-gray-600">
                                            Second-chance education for out-of-school children and youth,
                                            helping them catch up and reintegrate into formal education.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
                                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00B7EC]/10">
                                            <Users className="h-7 w-7 text-[#00B7EC]" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-[#23369C]">
                                            Girls' Education
                                        </h3>
                                        <p className="text-gray-600">
                                            Special initiatives to promote and support girls' education,
                                            addressing cultural barriers and creating safe learning environments.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Impact Statistics */}
                            <div className="rounded-2xl bg-gradient-to-br from-[#23369C]/10 to-[#00B7EC]/10 p-8">
                                <h2 className="mb-8 text-3xl font-bold text-[#23369C]">
                                    Our Impact
                                </h2>
                                <div className="grid gap-6 md:grid-cols-4">
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">320,000+</div>
                                        <p className="text-gray-700">Students Educated</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">500+</div>
                                        <p className="text-gray-700">Schools Supported</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">5,000+</div>
                                        <p className="text-gray-700">Teachers Trained</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="mb-2 text-4xl font-bold text-[#00B7EC]">25+</div>
                                        <p className="text-gray-700">Provinces Covered</p>
                                    </div>
                                </div>
                            </div>

                            {/* Programs Section */}
                            <div className="mt-16">
                                <h2 className="mb-8 text-3xl font-bold text-[#23369C]">
                                    Our Programs
                                </h2>
                                <div className="space-y-6">
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            Community-Based Education (CBE)
                                        </h3>
                                        <p className="text-gray-700">
                                            Establishing and supporting community-based classes that bring education
                                            directly to underserved communities, with a focus on reaching girls and
                                            children in remote areas.
                                        </p>
                                    </div>
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            Early Childhood Development (ECD)
                                        </h3>
                                        <p className="text-gray-700">
                                            Programs designed to prepare young children for formal schooling through
                                            early learning activities that develop cognitive, social, and emotional skills.
                                        </p>
                                    </div>
                                    <div className="rounded-lg border-l-4 border-[#00B7EC] bg-gray-50 p-6">
                                        <h3 className="mb-2 text-xl font-bold text-[#23369C]">
                                            Literacy and Numeracy Programs
                                        </h3>
                                        <p className="text-gray-700">
                                            Targeted programs to improve basic literacy and numeracy skills among
                                            students, ensuring they have a strong foundation for continued learning.
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
