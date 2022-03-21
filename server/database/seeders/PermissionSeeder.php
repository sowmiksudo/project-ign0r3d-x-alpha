<?php

namespace Database\Seeders;

use Spatie\Permission\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            "access admin panel",
            "view user stat",
            "view bombing stat",
            "view sms stat",
            "user verify",
            "user ban",
            "user unban",
            "user edit",
            "user changePass",
            "user getConfidentials",
            "promote",
            "demote",
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                "name" => $permission,
            ]);
        }

        Role::create([
            "name" => "Super Admin"
        ]);

        $moderatorPermissions = [
            "access admin panel",
            "view user stat",
            "user verify",
            "user ban",
            "user unban",
        ];

        $role = Role::create([
            "name" => "Moderator"
        ]);

        foreach ($moderatorPermissions as $permission) {
            $role->givePermissionTo($permission);
        }

        $role = Role::create([
            "name" => "User"
        ]);


    }
}
