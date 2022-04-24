<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class History extends Model
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
        "msisdn",
        "balance",
        "last_recharge",
        "cost"
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
