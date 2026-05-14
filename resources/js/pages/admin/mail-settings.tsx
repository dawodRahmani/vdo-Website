import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { Mail } from 'lucide-react'
import { useState } from 'react'

interface MailSettings {
    mailer: string
    host: string | null
    port: number | null
    encryption: string | null
    username: string | null
    password_set: boolean
    from_address: string | null
    from_name: string | null
    report_to_email: string | null
}

interface PageProps {
    settings: MailSettings
    errors: Record<string, string>
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Email Settings', href: '/admin/mail-settings' },
]

export default function AdminMailSettings() {
    const { props } = usePage<PageProps>()
    const s = props.settings

    const [form, setForm] = useState({
        mailer: s.mailer || 'smtp',
        host: s.host ?? '',
        port: s.port?.toString() ?? '',
        encryption: s.encryption ?? '',
        username: s.username ?? '',
        password: '',
        from_address: s.from_address ?? '',
        from_name: s.from_name ?? '',
        report_to_email: s.report_to_email ?? '',
    })
    const [saving, setSaving] = useState(false)
    const [testAddress, setTestAddress] = useState(s.report_to_email ?? '')
    const [testing, setTesting] = useState(false)

    const setField =
        (key: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
            setForm((f) => ({ ...f, [key]: e.target.value }))

    const handleSave = () => {
        setSaving(true)
        const payload: Record<string, string | number> = {
            mailer: form.mailer,
            host: form.host,
            port: form.port,
            encryption: form.encryption,
            username: form.username,
            from_address: form.from_address,
            from_name: form.from_name,
            report_to_email: form.report_to_email,
        }
        if (form.password) payload.password = form.password
        router.patch('/admin/mail-settings', payload, {
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => {
                setForm((f) => ({ ...f, password: '' }))
            },
        })
    }

    const handleTest = () => {
        setTesting(true)
        router.post(
            '/admin/mail-settings/test',
            { to: testAddress },
            {
                preserveScroll: true,
                onFinish: () => setTesting(false),
            },
        )
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Email Settings" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div>
                    <h1 className="text-2xl font-semibold">Email Settings</h1>
                    <p className="text-muted-foreground text-sm">
                        SMTP server for outgoing email and the destination for
                        the "Make a Report" form on the Our Commitment page.
                    </p>
                </div>

                <div className="border-border bg-card max-w-3xl space-y-6 rounded-xl border p-5 shadow-sm">
                    {/* Destination */}
                    <section className="space-y-3">
                        <h2 className="text-sm font-semibold">
                            Report destination
                        </h2>
                        <div className="space-y-1.5">
                            <Label htmlFor="report_to">
                                Send reports to (email)
                            </Label>
                            <Input
                                id="report_to"
                                type="email"
                                value={form.report_to_email}
                                onChange={setField('report_to_email')}
                                placeholder="reports@vdongo.org"
                            />
                            <p className="text-muted-foreground text-xs">
                                Submissions from the public "Make a Report"
                                form on /our-commitment are emailed here.
                            </p>
                        </div>
                    </section>

                    {/* From identity */}
                    <section className="space-y-3">
                        <h2 className="text-sm font-semibold">
                            From identity (envelope)
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="from_address">
                                    From address
                                </Label>
                                <Input
                                    id="from_address"
                                    type="email"
                                    value={form.from_address}
                                    onChange={setField('from_address')}
                                    placeholder="no-reply@vdongo.org"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="from_name">From name</Label>
                                <Input
                                    id="from_name"
                                    value={form.from_name}
                                    onChange={setField('from_name')}
                                    placeholder="VDO Website"
                                />
                            </div>
                        </div>
                    </section>

                    {/* SMTP */}
                    <section className="space-y-3">
                        <h2 className="text-sm font-semibold">SMTP server</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label htmlFor="mailer">Driver</Label>
                                <select
                                    id="mailer"
                                    value={form.mailer}
                                    onChange={setField('mailer')}
                                    className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
                                >
                                    <option value="smtp">SMTP</option>
                                    <option value="log">Log (testing)</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="encryption">Encryption</Label>
                                <select
                                    id="encryption"
                                    value={form.encryption}
                                    onChange={setField('encryption')}
                                    className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
                                >
                                    <option value="">None</option>
                                    <option value="tls">TLS</option>
                                    <option value="ssl">SSL</option>
                                    <option value="starttls">STARTTLS</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="host">Host</Label>
                                <Input
                                    id="host"
                                    value={form.host}
                                    onChange={setField('host')}
                                    placeholder="smtp.gmail.com"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="port">Port</Label>
                                <Input
                                    id="port"
                                    type="number"
                                    value={form.port}
                                    onChange={setField('port')}
                                    placeholder="587"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={form.username}
                                    onChange={setField('username')}
                                    placeholder="user@gmail.com"
                                    autoComplete="off"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={form.password}
                                    onChange={setField('password')}
                                    placeholder={
                                        s.password_set
                                            ? '•••••••• (leave blank to keep)'
                                            : 'app password'
                                    }
                                    autoComplete="new-password"
                                />
                                <p className="text-muted-foreground text-xs">
                                    Stored encrypted. Leave blank to keep the
                                    existing password.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? 'Saving…' : 'Save settings'}
                        </Button>
                    </div>
                </div>

                {/* Test email */}
                <div className="border-border bg-card max-w-3xl space-y-3 rounded-xl border p-5 shadow-sm">
                    <h2 className="text-sm font-semibold">Send a test email</h2>
                    <p className="text-muted-foreground text-xs">
                        Sends a small test message using the current SMTP
                        settings.
                    </p>
                    <div className="flex flex-col gap-3 md:flex-row md:items-end">
                        <div className="flex-1 space-y-1.5">
                            <Label htmlFor="test_to">Send to</Label>
                            <Input
                                id="test_to"
                                type="email"
                                value={testAddress}
                                onChange={(e) => setTestAddress(e.target.value)}
                                placeholder="you@example.com"
                            />
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleTest}
                            disabled={testing || !testAddress}
                        >
                            <Mail className="mr-1 h-4 w-4" />
                            {testing ? 'Sending…' : 'Send test'}
                        </Button>
                    </div>
                    {props.errors.mail_test && (
                        <p className="text-destructive text-xs">
                            {props.errors.mail_test}
                        </p>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}
