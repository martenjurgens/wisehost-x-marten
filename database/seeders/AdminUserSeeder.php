<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminEmail = 'admin@wisehosting.ee';
        $adminPassword = 'password';

        $adminUser = User::firstOrCreate(
            ['email' => $adminEmail],
            [
                'name' => 'Admin User',
                'email_verified_at' => now(),
                'password' => Hash::make($adminPassword),
                'role' => 'admin',
            ]
        );

        $this->command->info("Admin user '{$adminUser->email}' created");
    }
}
