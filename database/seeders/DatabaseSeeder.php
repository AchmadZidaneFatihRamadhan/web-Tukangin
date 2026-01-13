<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Panggil AdminSeeder
        $this->call(AdminSeeder::class);

        // (Opsional) user dummy
        // \App\Models\User::factory(10)->create();
    }
}
