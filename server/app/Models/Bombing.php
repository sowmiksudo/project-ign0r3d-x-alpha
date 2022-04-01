<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\API;
use App\Models\User;

class Bombing extends Model
{
    use HasFactory;

    public $fillable = [
        "number",
        "amount",
        "total_api_available",
        "ip",
        "userAgent"
    ];

    public function apis(){
        return $this->hasOneThrough(API::class, User::class);
    }

    public function user(){
        return $this->belongsTo(User::class)->withTrashed();
    }

}
