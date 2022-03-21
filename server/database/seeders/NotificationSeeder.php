<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Notification;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Notification::create([
            "message"=>"This is a test notification!",
            "has_action_link"=>true,
            "action_link"=>"https://google.com"
        ]);

        Notification::create([
            "message"=>"This is another test without link",
            "has_action_link"=>false
        ]);
    }
}
