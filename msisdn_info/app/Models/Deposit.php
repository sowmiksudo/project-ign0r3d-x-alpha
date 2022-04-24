<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Deposit extends Model
{
    use HasFactory;


    protected static function boot()
    {
        parent::boot();

        // Order by name ASC
        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('id', 'desc');
        });
    }

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
