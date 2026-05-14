import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Head, router } from '@inertiajs/react'
import { useState } from 'react'

interface SettingsPayload {
    contact_phone: string | null
    contact_email: string | null
    social_facebook_url: string | null
    social_twitter_url: string | null
    social_linkedin_url: string | null
    social_youtube_url: string | null
    newsletter_heading: string | null
    donate_button_text: string | null
    donate_button_url: string | null
}

interface PageProps {
    settings: SettingsPayload
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Header & Footer', href: '#' },
    { title: 'Footer', href: '/admin/site/footer' },
]

export default function AdminSiteFooter({ settings }: PageProps) {
    const [form, setForm] = useState({
        contact_phone: settings.contact_phone ?? '',
        contact_email: settings.contact_email ?? '',
        social_facebook_url: settings.social_facebook_url ?? '',
        social_twitter_url: settings.social_twitter_url ?? '',
        social_linkedin_url: settings.social_linkedin_url ?? '',
        social_youtube_url: settings.social_youtube_url ?? '',
        newsletter_heading: settings.newsletter_heading ?? '',
        donate_button_text: settings.donate_button_text ?? '',
        donate_button_url: settings.donate_button_url ?? '',
    })
    const [saving, setSaving] = useState(false)

    const setField = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value }))

    const handleSave = () => {
        setSaving(true)
        router.patch('/admin/site/footer', form, {
            preserveScroll: true,
            onFinish: () => setSaving(false),
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Footer" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Site Footer</h1>
                    <p className="text-muted-foreground text-sm">
                        Edit contact details, social links, newsletter heading,
                        and donate button shown in the footer.
                    </p>
                </div>

                <div className="border-border bg-card max-w-2xl space-y-6 rounded-xl border p-5 shadow-sm">
                    {/* Contact info */}
                    <section className="space-y-3">
                        <h2 className="text-sm font-semibold">Contact info</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="contact_phone">Phone</Label>
                                <Input
                                    id="contact_phone"
                                    value={form.contact_phone}
                                    onChange={setField('contact_phone')}
                                    placeholder="+93 728 777 117"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="contact_email">Email</Label>
                                <Input
                                    id="contact_email"
                                    type="email"
                                    value={form.contact_email}
                                    onChange={setField('contact_email')}
                                    placeholder="communications@vdongo.org"
                                />
                            </div>
                        </div>
                        <p className="text-muted-foreground text-xs">
                            Phone and email are shared with the header top bar.
                        </p>
                    </section>

                    {/* Social URLs */}
                    <section className="space-y-3">
                        <h2 className="text-sm font-semibold">Social media URLs</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="facebook">Facebook</Label>
                                <Input
                                    id="facebook"
                                    type="url"
                                    value={form.social_facebook_url}
                                    onChange={setField('social_facebook_url')}
                                    placeholder="https://facebook.com/…"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="twitter">X (Twitter)</Label>
                                <Input
                                    id="twitter"
                                    type="url"
                                    value={form.social_twitter_url}
                                    onChange={setField('social_twitter_url')}
                                    placeholder="https://twitter.com/…"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="linkedin">LinkedIn</Label>
                                <Input
                                    id="linkedin"
                                    type="url"
                                    value={form.social_linkedin_url}
                                    onChange={setField('social_linkedin_url')}
                                    placeholder="https://linkedin.com/…"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="youtube">YouTube</Label>
                                <Input
                                    id="youtube"
                                    type="url"
                                    value={form.social_youtube_url}
                                    onChange={setField('social_youtube_url')}
                                    placeholder="https://youtube.com/…"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Newsletter */}
                    <section className="space-y-3">
                        <h2 className="text-sm font-semibold">Newsletter</h2>
                        <div className="space-y-1.5">
                            <Label htmlFor="newsletter_heading">Heading</Label>
                            <Input
                                id="newsletter_heading"
                                value={form.newsletter_heading}
                                onChange={setField('newsletter_heading')}
                                placeholder="Sign up for our newsletter"
                            />
                        </div>
                    </section>

                    {/* Donate button */}
                    <section className="space-y-3">
                        <h2 className="text-sm font-semibold">Donate button</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="donate_button_text">Button text</Label>
                                <Input
                                    id="donate_button_text"
                                    value={form.donate_button_text}
                                    onChange={setField('donate_button_text')}
                                    placeholder="Donate"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="donate_button_url">Button URL</Label>
                                <Input
                                    id="donate_button_url"
                                    value={form.donate_button_url}
                                    onChange={setField('donate_button_url')}
                                    placeholder="/donate"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? 'Saving…' : 'Save changes'}
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
