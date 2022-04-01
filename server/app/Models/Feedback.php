<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Feedback extends Model
{
    use HasFactory;
    public $fillable = [
        "about",
        "message"
    ];

    public function user(){
        return $this->belongsTo(User::class)->withTrashed();
    }
}
