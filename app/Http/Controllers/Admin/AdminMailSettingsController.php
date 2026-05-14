<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\CommitmentReportMail;
use App\Models\MailSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class AdminMailSettingsController extends Controller
{
    public function edit()
    {
        $s = MailSetting::current();

        return Inertia::render('admin/mail-settings', [
            'settings' => [
                'mailer' => $s->mailer,
                'host' => $s->host,
                'port' => $s->port,
                'encryption' => $s->encryption,
                'username' => $s->username,
                'password_set' => ! empty($s->password),
                'from_address' => $s->from_address,
                'from_name' => $s->from_name,
                'report_to_email' => $s->report_to_email,
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'mailer' => 'required|string|max:32',
            'host' => 'nullable|string|max:191',
            'port' => 'nullable|integer|min:1|max:65535',
            'encryption' => 'nullable|in:tls,ssl,starttls',
            'username' => 'nullable|string|max:191',
            'password' => 'nullable|string|max:255',
            'from_address' => 'nullable|email|max:191',
            'from_name' => 'nullable|string|max:120',
            'report_to_email' => 'nullable|email|max:191',
        ]);

        $s = MailSetting::current();

        $data = [
            'mailer' => $validated['mailer'],
            'host' => $validated['host'] ?? null,
            'port' => $validated['port'] ?? null,
            'encryption' => $validated['encryption'] ?? null,
            'username' => $validated['username'] ?? null,
            'from_address' => $validated['from_address'] ?? null,
            'from_name' => $validated['from_name'] ?? null,
            'report_to_email' => $validated['report_to_email'] ?? null,
        ];

        // Only overwrite password if user typed a new one
        if (! empty($validated['password'])) {
            $data['password'] = $validated['password'];
        }

        $s->update($data);

        return back();
    }

    public function sendTest(Request $request)
    {
        $request->validate([
            'to' => 'required|email',
        ]);

        $s = MailSetting::current();
        $s->applyToRuntime();

        try {
            Mail::to($request->input('to'))->send(new CommitmentReportMail(
                subjectLine: 'Test email',
                comment: 'This is a test message from the VDO admin panel. If you can read this, SMTP is configured correctly.',
            ));
        } catch (\Throwable $e) {
            return back()->withErrors([
                'mail_test' => $e->getMessage(),
            ]);
        }

        return back()->with('mailTestSent', true);
    }
}
