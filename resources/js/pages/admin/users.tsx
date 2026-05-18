import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import { dashboard } from '@/routes'
import { type BreadcrumbItem } from '@/types'
import { Head, router, usePage } from '@inertiajs/react'
import { KeyRound, Pencil, Plus, Trash2, UserCog } from 'lucide-react'
import { useState } from 'react'

interface AdminUser {
    id: number
    name: string
    email: string
    role: 'admin' | 'user'
    created_at: string | null
    is_current: boolean
}

interface PageProps {
    users: AdminUser[]
    errors: Record<string, string>
    [key: string]: unknown
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Users', href: '/admin/users' },
]

function RoleBadge({ role }: { role: 'admin' | 'user' }) {
    if (role === 'admin') {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(62,64,149,0.1)] px-2 py-0.5 text-[11px] font-semibold text-[rgb(62,64,149)] uppercase">
                <UserCog className="h-3 w-3" />
                Admin
            </span>
        )
    }
    return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600 uppercase">
            User
        </span>
    )
}

function AddUserDialog({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (v: boolean) => void
}) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user' as 'user' | 'admin',
    })
    const [saving, setSaving] = useState(false)
    const { props } = usePage<PageProps>()
    const errors = props.errors ?? {}

    const submit = () => {
        setSaving(true)
        router.post('/admin/users', form, {
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => {
                setForm({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                    role: 'user',
                })
                onOpenChange(false)
            },
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Add user</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Label htmlFor="add-name">Name</Label>
                        <Input
                            id="add-name"
                            value={form.name}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, name: e.target.value }))
                            }
                        />
                        {errors.name && (
                            <p className="text-destructive text-xs">{errors.name}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="add-email">Email</Label>
                        <Input
                            id="add-email"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, email: e.target.value }))
                            }
                            autoComplete="off"
                        />
                        {errors.email && (
                            <p className="text-destructive text-xs">{errors.email}</p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="add-role">Role</Label>
                        <select
                            id="add-role"
                            value={form.role}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    role: e.target.value as 'user' | 'admin',
                                }))
                            }
                            className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="add-pw">Password</Label>
                        <Input
                            id="add-pw"
                            type="password"
                            value={form.password}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    password: e.target.value,
                                }))
                            }
                            autoComplete="new-password"
                        />
                        {errors.password && (
                            <p className="text-destructive text-xs">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="add-pw-c">Confirm password</Label>
                        <Input
                            id="add-pw-c"
                            type="password"
                            value={form.password_confirmation}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    password_confirmation: e.target.value,
                                }))
                            }
                            autoComplete="new-password"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={submit}
                        disabled={
                            saving ||
                            !form.name ||
                            !form.email ||
                            form.password.length < 8 ||
                            form.password !== form.password_confirmation
                        }
                    >
                        {saving ? 'Adding…' : 'Add user'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function EditUserDialog({
    user,
    open,
    onOpenChange,
}: {
    user: AdminUser | null
    open: boolean
    onOpenChange: (v: boolean) => void
}) {
    const [form, setForm] = useState({
        name: user?.name ?? '',
        email: user?.email ?? '',
        role: user?.role ?? 'user',
    })
    const [saving, setSaving] = useState(false)
    const { props } = usePage<PageProps>()
    const errors = props.errors ?? {}

    // Reset form when target user changes
    if (user && (form.name !== user.name && !saving && form.email === '')) {
        setForm({ name: user.name, email: user.email, role: user.role })
    }

    if (!user) return null

    const submit = () => {
        setSaving(true)
        router.patch(`/admin/users/${user.id}`, form, {
            preserveScroll: true,
            onFinish: () => setSaving(false),
            onSuccess: () => onOpenChange(false),
        })
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                if (!v) setForm({ name: '', email: '', role: 'user' })
                onOpenChange(v)
            }}
        >
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit user</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Label htmlFor="edit-name">Name</Label>
                        <Input
                            id="edit-name"
                            value={form.name}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, name: e.target.value }))
                            }
                        />
                        {errors.name && (
                            <p className="text-destructive text-xs">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="edit-email">Email</Label>
                        <Input
                            id="edit-email"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    email: e.target.value,
                                }))
                            }
                        />
                        {errors.email && (
                            <p className="text-destructive text-xs">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="edit-role">Role</Label>
                        <select
                            id="edit-role"
                            value={form.role}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    role: e.target.value as 'user' | 'admin',
                                }))
                            }
                            disabled={user.is_current}
                            className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm disabled:opacity-60"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        {user.is_current && (
                            <p className="text-muted-foreground text-[10px]">
                                You can't change your own role.
                            </p>
                        )}
                        {errors.role && (
                            <p className="text-destructive text-xs">
                                {errors.role}
                            </p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={submit} disabled={saving}>
                        {saving ? 'Saving…' : 'Save'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function PasswordDialog({
    user,
    open,
    onOpenChange,
}: {
    user: AdminUser | null
    open: boolean
    onOpenChange: (v: boolean) => void
}) {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [saving, setSaving] = useState(false)
    const { props } = usePage<PageProps>()
    const errors = props.errors ?? {}

    if (!user) return null

    const submit = () => {
        setSaving(true)
        router.patch(
            `/admin/users/${user.id}/password`,
            {
                password,
                password_confirmation: confirm,
            },
            {
                preserveScroll: true,
                onFinish: () => setSaving(false),
                onSuccess: () => {
                    setPassword('')
                    setConfirm('')
                    onOpenChange(false)
                },
            },
        )
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                if (!v) {
                    setPassword('')
                    setConfirm('')
                }
                onOpenChange(v)
            }}
        >
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Change password for {user.name}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Label htmlFor="new-pw">New password</Label>
                        <Input
                            id="new-pw"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                        />
                        {errors.password && (
                            <p className="text-destructive text-xs">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="new-pw-c">Confirm new password</Label>
                        <Input
                            id="new-pw-c"
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            autoComplete="new-password"
                        />
                    </div>
                    <p className="text-muted-foreground text-xs">
                        Minimum 8 characters. The user will use this password on
                        their next login.
                    </p>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={submit}
                        disabled={
                            saving ||
                            password.length < 8 ||
                            password !== confirm
                        }
                    >
                        {saving ? 'Saving…' : 'Update password'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function AdminUsers() {
    const { props } = usePage<PageProps>()
    const users = props.users
    const errors = props.errors ?? {}

    const [addOpen, setAddOpen] = useState(false)
    const [editing, setEditing] = useState<AdminUser | null>(null)
    const [editOpen, setEditOpen] = useState(false)
    const [pwTarget, setPwTarget] = useState<AdminUser | null>(null)
    const [pwOpen, setPwOpen] = useState(false)

    const openEdit = (u: AdminUser) => {
        setEditing(u)
        setEditOpen(true)
    }

    const openPw = (u: AdminUser) => {
        setPwTarget(u)
        setPwOpen(true)
    }

    const destroy = (u: AdminUser) => {
        if (!confirm(`Delete user "${u.name}"? This cannot be undone.`)) return
        router.delete(`/admin/users/${u.id}`, { preserveScroll: true })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold">Users</h1>
                        <p className="text-muted-foreground text-sm">
                            Add new admins, edit roles, reset passwords, and
                            remove accounts.
                        </p>
                    </div>
                    <Button onClick={() => setAddOpen(true)}>
                        <Plus className="mr-1 h-4 w-4" />
                        Add user
                    </Button>
                </div>

                {errors.delete && (
                    <p className="text-destructive rounded-md bg-red-50 px-3 py-2 text-xs">
                        {errors.delete}
                    </p>
                )}

                <div className="border-border bg-card overflow-hidden rounded-xl border shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-muted-foreground text-xs uppercase">
                            <tr>
                                <th className="px-4 py-2 text-left font-medium">
                                    Name
                                </th>
                                <th className="px-4 py-2 text-left font-medium">
                                    Email
                                </th>
                                <th className="px-4 py-2 text-left font-medium">
                                    Role
                                </th>
                                <th className="px-4 py-2 text-left font-medium">
                                    Joined
                                </th>
                                <th className="px-4 py-2 text-right font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr
                                    key={u.id}
                                    className="border-border border-t last:border-b-0"
                                >
                                    <td className="px-4 py-2 font-medium">
                                        {u.name}
                                        {u.is_current && (
                                            <span className="text-muted-foreground ml-2 text-[10px] uppercase">
                                                (you)
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700">
                                        {u.email}
                                    </td>
                                    <td className="px-4 py-2">
                                        <RoleBadge role={u.role} />
                                    </td>
                                    <td className="text-muted-foreground px-4 py-2 text-xs">
                                        {u.created_at ?? '—'}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => openEdit(u)}
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                            </Button>
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => openPw(u)}
                                                title="Change password"
                                            >
                                                <KeyRound className="h-3.5 w-3.5" />
                                            </Button>
                                            {!u.is_current && (
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => destroy(u)}
                                                    className="text-destructive hover:text-destructive"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddUserDialog open={addOpen} onOpenChange={setAddOpen} />
            <EditUserDialog
                user={editing}
                open={editOpen}
                onOpenChange={(v) => {
                    setEditOpen(v)
                    if (!v) setEditing(null)
                }}
            />
            <PasswordDialog
                user={pwTarget}
                open={pwOpen}
                onOpenChange={(v) => {
                    setPwOpen(v)
                    if (!v) setPwTarget(null)
                }}
            />
        </AppLayout>
    )
}
