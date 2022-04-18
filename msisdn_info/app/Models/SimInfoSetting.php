<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimInfoSetting extends Model
{
    use HasFactory;

    public $fillable = [
        "is_accepting_deposits",
        "is_lr_open",
        "bkash_number",
        "nagad_number",
    ];
}
