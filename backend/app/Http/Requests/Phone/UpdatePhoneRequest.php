<?php

namespace App\Http\Requests\Phone;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePhoneRequest extends FormRequest
{
    public function authorize(): true
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'value' => 'required|string|unique:phones',
            'monthlyPrice' => 'required|numeric',
            'setupPrice' => 'required|numeric',
            'currency' => 'required|string|max:3',
        ];
    }
}
