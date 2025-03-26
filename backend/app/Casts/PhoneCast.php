<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use InvalidArgumentException;

class PhoneCast implements CastsAttributes
{
    public function get($model, string $key, mixed $value, array $attributes): string
    {
        return $this->sanitized($value);
    }

    public function set($model, string $key, mixed $value, array $attributes): string
    {
        $sanitized = $this->sanitized($value);

        if (strlen($sanitized) !== 13) {
            throw new InvalidArgumentException("O número de telefone deve ter exatamente 13 dígitos.");
        }

        return $sanitized;
    }

    private function sanitized(string $value): string
    {
        return preg_replace('/\D/', '', $value);
    }

}
