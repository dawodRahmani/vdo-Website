<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Http\UploadedFile;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class CommitmentReportMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $subjectLine,
        public string $comment,
        public ?UploadedFile $attachment = null,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: '[VDO Report] '.$this->subjectLine,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.commitment-report',
            with: [
                'subjectLine' => $this->subjectLine,
                'comment' => $this->comment,
            ],
        );
    }

    public function attachments(): array
    {
        if (! $this->attachment) {
            return [];
        }

        return [
            \Illuminate\Mail\Mailables\Attachment::fromPath(
                $this->attachment->getRealPath(),
            )->as($this->attachment->getClientOriginalName())
                ->withMime($this->attachment->getMimeType()),
        ];
    }
}
