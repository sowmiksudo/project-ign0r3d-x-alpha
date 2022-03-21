<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->integer("daily_limit_non_verified")->default(5);
            $table->integer("daily_limit_verified")->default(20);
            $table->text("verify_link");
            $table->boolean("can_send_feedback")->default(true);
            $table->boolean("is_under_maintanance")->default(false);
            $table->boolean("is_sms_sender_active")->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
