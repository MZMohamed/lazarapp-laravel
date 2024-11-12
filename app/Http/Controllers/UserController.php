<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Group;
use Inertia\Response;
use Illuminate\Http\Request;

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
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'required|string|min:8',
            'email' => 'required|email|unique:users,email',
            'group' => 'required|integer',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'password' => bcrypt($validated['password']),
            'email' => $validated['email'],
        ]);

        $user->groups()->attach($validated['group']);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
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
