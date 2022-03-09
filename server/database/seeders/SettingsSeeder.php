<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('settings')->insert([
            "verify_notice" => "You are not verified! Verify for more interesting",
            "created_at"=>Carbon::now(),
            "updated_at"=>Carbon::now()
        ]);
    }
}
