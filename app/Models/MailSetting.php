<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;

class MailSetting extends Model
{
    protected $guarded = [];

    protected $casts = [
        'password' => 'encrypted',
        'port' => 'integer',
    ];

    public static function current(): self
    {
        return static::query()->firstOrCreate(['id' => 1]);
    }

    /**
     * Apply this row's SMTP config to the runtime mail config so the next
     * Mail::send() goes through the user-configured server.
     */
    public function applyToRuntime(): void
    {
        if (! $this->host || ! $this->port) {
            return;
        }

        Config::set('mail.default', $this->mailer ?: 'smtp');
        Config::set('mail.mailers.smtp.transport', 'smtp');
        Config::set('mail.mailers.smtp.host', $this->host);
        Config::set('mail.mailers.smtp.port', $this->port);
        Config::set('mail.mailers.smtp.encryption', $this->encryption ?: null);
        Config::set('mail.mailers.smtp.username', $this->username);
        Config::set('mail.mailers.smtp.password', $this->password);
        Config::set('mail.mailers.smtp.timeout', 10);

        if ($this->from_address) {
            Config::set('mail.from.address', $this->from_address);
        }
        if ($this->from_name) {
            Config::set('mail.from.name', $this->from_name);
        }
    }
}
