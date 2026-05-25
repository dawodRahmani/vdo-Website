import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Download } from 'lucide-react'

interface DocumentReaderModalProps {
    open: boolean
    onClose: () => void
    title: string | null
    documentUrl: string | null
}

export default function DocumentReaderModal({
    open,
    onClose,
    title,
    documentUrl,
}: DocumentReaderModalProps) {
    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="flex max-h-[90vh] max-w-5xl flex-col overflow-hidden p-0 sm:max-w-6xl">
                <DialogHeader className="flex flex-row items-center justify-between border-b border-gray-200 px-5 py-3">
                    <DialogTitle className="text-base font-semibold text-[rgb(62,64,149)]">
                        {title ?? 'Publication'}
                    </DialogTitle>
                    {documentUrl && (
                        <a
                            href={documentUrl}
                            download
                            className="inline-flex items-center gap-1 rounded bg-[rgb(0,175,239)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[rgb(0,175,239)]/90"
                        >
                            <Download className="h-3.5 w-3.5" />
                            Download
                        </a>
                    )}
                </DialogHeader>
                <div className="flex-1 bg-gray-100">
                    {documentUrl ? (
                        <iframe
                            key={documentUrl}
                            src={documentUrl}
                            title={title ?? 'Publication'}
                            className="h-[80vh] w-full border-0 bg-white"
                        />
                    ) : (
                        <div className="flex h-[40vh] w-full items-center justify-center text-sm text-gray-500">
                            No document attached.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
