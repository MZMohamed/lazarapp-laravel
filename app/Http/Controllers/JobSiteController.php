<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Group;
use App\Models\JobSite;
use App\Models\Vehicle;
use App\Models\District;
use App\Models\Location;
use App\Models\VehicleType;
use Illuminate\Http\Request;

class JobSiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Group jobs by vehicleType
        $groupedJobs = $this->getJobsGroupedByVehicleType();

        return Inertia::render('Jobs/Index', [
            'jobs' => JobSite::all()->map(function ($job) {
                return [
                    'id' => $job->id,
                    'jobNumber' => $job->jobNumber
                ];
            }),
            'groupedJobs' => $groupedJobs,

            'groups' => Group::all()->map(function ($group) {
                return [
                    'id' => $group->id,
                    'name' => $group->name
                ];
            }),
            'vehicleTypes' => VehicleType::all()->map(function ($vehicleTypes) {
                return [
                    'id' => $vehicleTypes->id,
                    'name' => $vehicleTypes->name
                ];
            }),
            'districts' => District::all()->map(function ($district) {
                return [
                    'id' => $district->id,
                    'name' => $district->name,
                    'number' => $district->number,
                    'code' => $district->code
                ];
            }),
            'locations' => Location::all()->map(function ($location) {
                return [
                    'id' => $location->id,
                    'name' => $location->name,
                    'district' => $location->district,
                ];
            })
            // 'create_url' => route('job.create'),
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

    public function getJobsGroupedByVehicleType()
    {
        // Fetch all vehicle types with their related jobs
        $vehicleTypes = VehicleType::with(['vehicles.jobs.driver' => function ($query) {
            // You can add filters to the jobs here if needed
        }])->get();

        // Transform the data into the desired format
        $groupedJobs = $vehicleTypes->map(function ($vehicleType) {
            return [
                'id' => $vehicleType->id,
                'name' => $vehicleType->name,
                'jobs' => $vehicleType->vehicles
                    ->flatMap(function ($vehicle) {
                        return $vehicle->jobs; // Get jobs for each vehicle
                    })
                    ->unique('id') // Ensure unique jobs
                    ->values(), // Reindex array
            ];
        });

        return response()->json($groupedJobs);
    }
}
