<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            "name"=>"ADMIN",
            "email"=>"xowmik@gmail.com",
            "number"=>"01955033900",
            "password"=>Hash::make("komuna"),
            "created_at"=>Carbon::now(),
            "updated_at"=>Carbon::now(),
        ]);
        $user->assignRole("Super Admin");

        $user = User::create([
            "name"=>"Moderator",
            "email"=>"sowmik@gmail.com",
            "number"=>"01641356699",
            "password"=>Hash::make("komuna"),
            "created_at"=>Carbon::now(),
            "updated_at"=>Carbon::now(),
        ]);
        $user->assignRole("Moderator");
    }
}
