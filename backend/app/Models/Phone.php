<?php

namespace App\Models;

use App\Casts\PhoneCast;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    protected $fillable = [
        'value',
        'monthlyPrice',
        'setupPrice',
        'currency'
    ];

    protected $casts = [
        'value' => PhoneCast::class,
        'monthlyPrice' => 'float',
        'setupPrice' => 'float'
    ];

}
