<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class SimInfoSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sim_info_settings')->insert([
            "is_accepting_deposits"=>true,
            "is_lr_open"=>true,
            "bkash_number"=>"01641356699",
            "nagad_number"=>"01641356699",
            "cost_per_search"=>30
        ]);
    }
}
