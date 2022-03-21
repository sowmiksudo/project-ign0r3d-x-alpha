<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
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
            "message"=>Str::random(150),
            "ip"=>$this->faker->ipv4(),
            "user_agent"=>$this->faker->userAgent(),
            "created_at"=>now(),
            "updated_at"=>now(),
        ];
    }
}
