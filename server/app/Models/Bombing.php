<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\API;

class Bombing extends Model
{
    use HasFactory;


    public function apis(){
        return $this->hasOne(API::class);
    }

}
