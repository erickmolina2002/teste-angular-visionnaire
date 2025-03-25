<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
class PhoneResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'value' => $this->value,
            'monthlyPrice' => number_format($this->monthlyPrice, 2),
            'setupPrice' => number_format($this->setupPrice, 2),
            'currency' => $this->currency
        ];
    }

}
