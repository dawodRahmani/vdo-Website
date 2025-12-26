import { Download, FileText } from 'lucide-react'

const publications = [
    {
        id: 1,
        title: 'Project Final Report',
        image: '/images/1.jpg',
        downloadUrl: '/downloads/project-final-report.pdf',
        description: 'Comprehensive final report of our ongoing projects',
    },
    {
        id: 2,
        title: 'Guide Book 2023',
        image: '/images/2.jpg',
        downloadUrl: '/downloads/guide-book-2023.pdf',
        description: 'Essential guidelines and best practices',
    },
    {
        id: 3,
        title: 'Annual Report',
        image: '/images/3.jpg',
        downloadUrl: '/downloads/annual-report.pdf',
        description: 'Yearly overview of achievements and impact',
    },
    {
        id: 4,
        title: 'Annual Booklet',
        image: '/images/1.jpg',
        downloadUrl: '/downloads/annual-booklet.pdf',
        description: 'Summary of annual activities and outcomes',
    },
]

export default function Publications() {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-4xl font-bold text-[#23369C]">
                    Publications & Resources
                </h2>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {publications.map((publication) => (
                        <div
                            key={publication.id}
                            className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                            style={{ borderTop: '4px solid #00B7EC' }}
                        >
                            {/* Document Preview Image */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#BDBFC1]/10">
                                <img
                                    src={publication.image}
                                    alt={publication.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#23369C]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Icon overlay */}
                                <div className="absolute right-4 top-4 rounded-lg bg-[#00B7EC] p-2 shadow-md">
                                    <FileText className="h-5 w-5 text-white" />
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5">
                                <h3 className="mb-2 text-lg font-bold text-[#23369C] line-clamp-2">
                                    {publication.title}
                                </h3>
                                <p className="mb-4 text-sm text-[#BDBFC1] line-clamp-2">
                                    {publication.description}
                                </p>

                                {/* Download Button */}
                                <a
                                    href={publication.downloadUrl}
                                    download
                                    className="flex items-center justify-center gap-2 rounded-lg bg-[#00B7EC] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#00B7EC]/90 hover:shadow-md"
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Download</span>
                                </a>
                            </div>

                            {/* Decorative corner */}
                            <div
                                className="absolute bottom-0 right-0 h-20 w-20 translate-x-8 translate-y-8 rounded-full opacity-10"
                                style={{ backgroundColor: '#00B7EC' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
