<?php

namespace App\Http\Controllers;

use App\Http\Requests\Phone\StorePhoneRequest;
use App\Http\Requests\Phone\UpdatePhoneRequest;
use App\Http\Resources\PhoneResource;
use App\Models\Phone;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class PhoneController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return PhoneResource::collection(Phone::paginate(10));
    }

    public function store(StorePhoneRequest $request): PhoneResource
    {
        return new PhoneResource(
            Phone::create($request->validated())
        );
    }
    public function show(Phone $phone): PhoneResource
    {
        return new PhoneResource($phone);
    }

    public function update(UpdatePhoneRequest $request, Phone $phone): PhoneResource
    {
        $phone->update($request->validated());
        return new PhoneResource($phone->fresh());
    }

    public function destroy(Phone $phone): Response
    {
        $phone->delete();
        return response()->noContent();
    }
}
