import { cn } from '@/lib/utils'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
    Bold,
    Heading2,
    Heading3,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Quote,
    Redo2,
    Strikethrough,
    Underline as UnderlineIcon,
    Undo2,
} from 'lucide-react'
import { useEffect } from 'react'

interface RichTextEditorProps {
    value: string
    onChange: (html: string) => void
    placeholder?: string
    minHeight?: number
    disabled?: boolean
}

export default function RichTextEditor({
    value,
    onChange,
    placeholder,
    minHeight = 160,
    disabled = false,
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                autolink: true,
                HTMLAttributes: {
                    class: 'text-[rgb(0,175,239)] underline',
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
            }),
            Placeholder.configure({
                placeholder: placeholder ?? 'Write something…',
            }),
        ],
        content: value || '',
        editable: !disabled,
        editorProps: {
            attributes: {
                class: cn(
                    'prose prose-sm max-w-none focus:outline-none',
                    'prose-headings:text-[rgb(62,64,149)] prose-p:my-2 prose-ul:my-2 prose-ol:my-2',
                    'prose-a:text-[rgb(0,175,239)]',
                ),
                style: `min-height: ${minHeight}px`,
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange(html === '<p></p>' ? '' : html)
        },
    })

    // Sync incoming value changes (e.g. when switching between items)
    useEffect(() => {
        if (!editor) return
        const current = editor.getHTML()
        if (value && value !== current) {
            editor.commands.setContent(value, { emitUpdate: false })
        } else if (!value && current !== '<p></p>') {
            editor.commands.clearContent(false)
        }
    }, [value, editor])

    if (!editor) {
        return (
            <div
                className="rounded-md border border-input bg-background"
                style={{ minHeight: minHeight + 40 }}
            />
        )
    }

    return (
        <div className="rounded-md border border-input bg-background">
            <Toolbar editor={editor} disabled={disabled} />
            <div className="px-3 py-2">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

function Toolbar({ editor, disabled }: { editor: Editor; disabled: boolean }) {
    const btn = (
        active: boolean,
        onClick: () => void,
        title: string,
        icon: React.ReactNode,
    ) => (
        <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClick}
            disabled={disabled}
            title={title}
            aria-label={title}
            aria-pressed={active}
            className={cn(
                'inline-flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
                active && 'bg-accent text-foreground',
                disabled && 'cursor-not-allowed opacity-50',
            )}
        >
            {icon}
        </button>
    )

    const addLink = () => {
        const prev = editor.getAttributes('link').href as string | undefined
        const url = window.prompt('Link URL', prev ?? 'https://')
        if (url === null) return
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }
        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run()
    }

    return (
        <div className="flex flex-wrap items-center gap-0.5 border-b border-input px-2 py-1.5">
            {btn(
                editor.isActive('bold'),
                () => editor.chain().focus().toggleBold().run(),
                'Bold',
                <Bold className="h-3.5 w-3.5" />,
            )}
            {btn(
                editor.isActive('italic'),
                () => editor.chain().focus().toggleItalic().run(),
                'Italic',
                <Italic className="h-3.5 w-3.5" />,
            )}
            {btn(
                editor.isActive('underline'),
                () => editor.chain().focus().toggleUnderline().run(),
                'Underline',
                <UnderlineIcon className="h-3.5 w-3.5" />,
            )}
            {btn(
                editor.isActive('strike'),
                () => editor.chain().focus().toggleStrike().run(),
                'Strikethrough',
                <Strikethrough className="h-3.5 w-3.5" />,
            )}
            <span className="mx-1 h-4 w-px bg-border" />
            {btn(
                editor.isActive('heading', { level: 2 }),
                () =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run(),
                'Heading 2',
                <Heading2 className="h-3.5 w-3.5" />,
            )}
            {btn(
                editor.isActive('heading', { level: 3 }),
                () =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run(),
                'Heading 3',
                <Heading3 className="h-3.5 w-3.5" />,
            )}
            <span className="mx-1 h-4 w-px bg-border" />
            {btn(
                editor.isActive('bulletList'),
                () => editor.chain().focus().toggleBulletList().run(),
                'Bulleted list',
                <List className="h-3.5 w-3.5" />,
            )}
            {btn(
                editor.isActive('orderedList'),
                () => editor.chain().focus().toggleOrderedList().run(),
                'Numbered list',
                <ListOrdered className="h-3.5 w-3.5" />,
            )}
            {btn(
                editor.isActive('blockquote'),
                () => editor.chain().focus().toggleBlockquote().run(),
                'Quote',
                <Quote className="h-3.5 w-3.5" />,
            )}
            <span className="mx-1 h-4 w-px bg-border" />
            {btn(
                editor.isActive('link'),
                addLink,
                'Link',
                <LinkIcon className="h-3.5 w-3.5" />,
            )}
            <span className="mx-1 h-4 w-px bg-border" />
            {btn(
                false,
                () => editor.chain().focus().undo().run(),
                'Undo',
                <Undo2 className="h-3.5 w-3.5" />,
            )}
            {btn(
                false,
                () => editor.chain().focus().redo().run(),
                'Redo',
                <Redo2 className="h-3.5 w-3.5" />,
            )}
        </div>
    )
}
