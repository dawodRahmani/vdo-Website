<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StrategicPriorityCard extends Model
{
    protected $guarded = [];

    protected $casts = ['order' => 'integer'];

    public function scopeOrdered($q)
    {
        return $q->orderBy('order');
    }
}
