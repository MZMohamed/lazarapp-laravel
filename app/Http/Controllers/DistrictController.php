<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\District;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Http\Resources\DistrictResource;
use App\Http\Requests\DistrictStoreRequest;

class DistrictController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Districts/Index', [
            'districts' => District::all()->map(function ($district) {
                return [
                    'id' => $district->id,
                    'name' => $district->name,
                    'edit_url' => route('districts.edit', $district),
                ];
            }),
            'create_url' => route('districts.create'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Districts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DistrictStoreRequest $request)
    {
        $validated = $request->validated();

        District::create([
            'name' => $validated['name']
        ]);

        return to_route('districts.index')->with('success', 'District created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(District $district)
    {
        return Inertia::render('Districts/Edit', [
            'district' => new DistrictResource($district),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(District $district, DistrictStoreRequest $request): RedirectResponse
    {
        $district->update($request->validated());
        return to_route('districts.index')->with('success', 'District Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(District $district): RedirectResponse
    {
        $district->delete();
        return to_route('districts.index')->with('success', 'District Deleted');
    }
}
