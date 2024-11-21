<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupStoreRequest;
use App\Http\Resources\GroupResource;
use App\Models\Group;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;

use function Pest\Laravel\delete;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Groups/Index', [
            'groups' => Group::all()->map(function ($group) {
                return [
                    'id' => $group->id,
                    'name' => $group->name,
                    'edit_url' => route('groups.edit', $group),
                    'groupCreateDate' => $group->created_at,
                    'groupLastModifiedDate' => $group->updated_at,
                ];
            }),
            'create_url' => route('groups.create'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Groups/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        Group::create([
            'name' => $validated['name']
        ]);

        return redirect()->route('groups.index')->with('success', 'Group created successfully.');
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
    public function edit(Group $group): Response
    {
        return Inertia::render('Groups/Edit', [
            'group' => new GroupResource($group),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Group $group, GroupStoreRequest $request): RedirectResponse
    {
        $group->update($request->validated());
        return to_route('groups.index')->with('sucess', 'Group Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group): RedirectResponse
    {
        $group->delete();
        return to_route('groups.index')->with('sucess', 'Group Deleted');

    }
}
