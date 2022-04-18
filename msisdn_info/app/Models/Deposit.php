<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deposit extends Model
{
    use HasFactory;
    public $fillable = [
        "amount",
        "trnx_id",
        "sender_number",
        "payment_money",
        "payment_method",
        "status",
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
