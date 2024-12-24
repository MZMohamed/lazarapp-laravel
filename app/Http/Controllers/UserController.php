<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Group;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\UserStoreRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Users/Index', [
            'users' => User::all()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'edit_url' => route('users.edit', $user),
                    'UserCreateDate' => $user->created_at,
                    'UserLastModifiedDate' => $user->updated_at,
                    'isEnabled' => $user->isEnabled

                ];
            }),
            'create_url' => route('users.create'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Users/Create', [
            'groups' => Group::all()->map(function ($group) {
                return [
                    'id' => $group->id,
                    'name' => $group->name
                ];
            })
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserStoreRequest $request)
    {
        $validated = $request->validated();

        // sanitize groups
        $groupIds = array_map(function ($group_id) {
            return ["group_id" => $group_id];
        }, $validated['groups']);

        $user = User::create([
            'name' => $validated['name'],
            'password' => bcrypt($validated['password']),
            'email' => $validated['email'],
        ]);

        $user->groups()->attach($groupIds);

        return to_route('users.index')->with('success', 'User created successfully.');
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
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => new UserResource($user->load('groups')),
            'groups' => Group::all()->map(function ($group) {
                return [
                    'id' => $group->id,
                    'name' => $group->name
                ];
            })
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(User $user, UserStoreRequest $request): RedirectResponse
    {
        $user->update($request->validated());
        return to_route('users.index')->with('success', 'User Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
