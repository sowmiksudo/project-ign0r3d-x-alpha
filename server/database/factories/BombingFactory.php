<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BombingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "number"=>"01" . $this->faker->randomDigit(9),
            "user_id"=>2,
            "total_api_available"=>$this->faker->randomNumber(2),
            "ip"=>$this->faker->ipv4(),
            "userAgent"=>$this->faker->userAgent(),
            "created_at"=>now(),
            "updated_at"=>now(),
        ];
    }
}
