<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Driver;
use Illuminate\Http\Request;
use App\Http\Resources\DriverResource;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\DriverStoreRequest;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Drivers/Index', [
            'drivers' => Driver::all()->map(function ($driver) {
                return [
                    'id' => $driver->id,
                    'name' => $driver->name,
                    'edit_url' => route('drivers.edit', $driver),
                ];
            }),
            'create_url' => route('drivers.create'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Drivers/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DriverStoreRequest $request)
    {
        $validated = $request->validated();

        Driver::create([
            'name' => $validated['name']
        ]);

        return to_route('drivers.index')->with('success', 'Driver created successfully.');
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
    public function edit(Driver $driver)
    {
        return Inertia::render('Drivers/Edit', [
            'driver' => new DriverResource($driver),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Driver $driver, DriverStoreRequest $request): RedirectResponse
    {
        $driver->update($request->validated());
        return to_route('drivers.index')->with('success', 'Driver Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Driver $driver)
    {
        $driver->delete();
        return to_route('drivers.index')->with('sucess', 'Driver Deleted');//
    }
}
