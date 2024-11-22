<?php

namespace App\Http\Controllers;

use App\Http\Resources\AgentResource;
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
        return Inertia::render('Agents/Index', [
            'agents' => Agent::all()->map(function ($agent) {
                return [
                    'id' => $agent->id,
                    'name' => $agent->name,
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
        return Inertia::render('Agents/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        Agent::create([
            'name' => $validated['name']
        ]);

        return redirect()->route('agents.index')->with('success', 'Agent created successfully.');
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
    public function edit(Agent $agent)
    {
        return Inertia::render('Agents/Edit', [
            'agent' => new AgentResource($agent),
        ]);
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
    public function destroy(Agent $agent)
    {
        $agent->delete();
        return to_route('agents.index')->with('sucess', 'Agent Deleted');//
    }
}
