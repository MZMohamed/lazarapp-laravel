<?php

namespace App\Http\Controllers;

use App\Models\Agent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Groups/Index', [
            'groups' => Agent::all()->map(function ($agent) {
                return [
                    'id' => $agent->id,
                    'name' => $agent->name,
                    'agentCreateDate' => $agent->created_at,
                    'agentLastModifiedDate' => $agent->updated_at,
                    'edit_url' => route('agents.edit', $agent),
                ];
            }),
            'create_url' => route('agents.create'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
