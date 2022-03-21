<?php

namespace Database\Seeders;

use App\Models\Notification;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            SettingsSeeder::class,
            PermissionSeeder::class,
            UserSeeder::class,
            NotificationSeeder::class,
        ]);
    }
}
