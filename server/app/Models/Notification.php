<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    public $fillable = [
        "has_action_link",
        "action_link",
        "message"
    ];

    protected $casts = [
        'has_action_link'
    ];
}
