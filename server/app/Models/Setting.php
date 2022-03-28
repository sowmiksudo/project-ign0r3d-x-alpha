<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $casts = [
        'can_send_feedback' => 'integer',
        'is_under_maintanance' => 'integer',
        'is_sms_sender_active' => 'integer',
    ];
}
