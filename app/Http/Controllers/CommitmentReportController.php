<?php

namespace App\Http\Controllers;

use App\Mail\CommitmentReportMail;
use App\Models\MailSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class CommitmentReportController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject' => 'required|string|max:255',
            'comment' => 'required|string|max:5000',
            'attachment' => 'nullable|file|max:5120|mimes:pdf,doc,docx,jpg,jpeg,png,webp,txt',
        ]);

        $settings = MailSetting::current();

        if (! $settings->report_to_email) {
            return back()->withErrors([
                'report' => 'Report submissions are not available right now. Please try again later.',
            ]);
        }

        $settings->applyToRuntime();

        try {
            Mail::to($settings->report_to_email)->send(new CommitmentReportMail(
                subjectLine: $validated['subject'],
                comment: $validated['comment'],
                attachment: $request->file('attachment'),
            ));
        } catch (\Throwable $e) {
            Log::error('Commitment report mail failed', [
                'error' => $e->getMessage(),
            ]);

            return back()->withErrors([
                'report' => 'We could not send your report at the moment. Please try again later.',
            ]);
        }

        return back()->with('reportSent', true);
    }
}
