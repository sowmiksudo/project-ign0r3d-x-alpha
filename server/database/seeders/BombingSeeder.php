<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bombing;

class BombingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Bombing::factory()->count(100)->create();
    }
}
