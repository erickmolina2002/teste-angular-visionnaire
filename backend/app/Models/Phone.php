<?php

namespace App\Models;

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
        'monthlyPrice' => 'float',
        'setupPrice' => 'float'
    ];

}
