<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Bombing;

class API extends Model
{
    use HasFactory;


    public $fillable = [
        "config",
        "name",
        "ip",
        "userAgent"
    ];

    public $hidden = [
        "ip",
        "userAgent"
    ];



    public function user(){
        return $this->BelongsTo(User::class);
    }

    public function bombings(){
        return $this->belongsToMany(Bombing::class);
    }
}
