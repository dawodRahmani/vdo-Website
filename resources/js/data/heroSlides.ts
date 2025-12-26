// Hero Slider Data
// This file contains all slider content - easy to make dynamic later

export interface HeroSlide {
    id: number
    image: string
    title: {
        prefix: string
        highlight: string
        suffix: string
    }
    subtitle: {
        parts: Array<{
            text: string
            highlight?: boolean
        }>
    }
    cta?: {
        text: string
        link: string
    }
}

export const heroSlides: HeroSlide[] = [
    {
        id: 1,
        image: '/images/1.jpg',
        title: {
            prefix: 'We Are',
            highlight: 'DEDICATED',
            suffix: 'to',
        },
        subtitle: {
            parts: [
                { text: 'REBUILDING', highlight: true },
                { text: 'Not Just' },
                { text: 'HOMES', highlight: true },
                { text: ', But' },
                { text: 'HOPE', highlight: true },
            ],
        },
    },
    {
        id: 2,
        image: '/images/2.jpg',
        title: {
            prefix: 'Restoring',
            highlight: 'LIVES',
            suffix: ', Empowering',
        },
        subtitle: {
            parts: [
                { text: 'COMMUNITIES', highlight: true },
                { text: ', and Standing' },
                { text: 'STRONG', highlight: true },
            ],
        },
    },
    {
        id: 3,
        image: '/images/3.jpg',
        title: {
            prefix: 'Building a',
            highlight: 'BRIGHTER',
            suffix: 'Future',
        },
        subtitle: {
            parts: [
                { text: 'For' },
                { text: 'AFGHANISTAN', highlight: true },
                { text: 'and Its' },
                { text: 'PEOPLE', highlight: true },
            ],
        },
    },
]
