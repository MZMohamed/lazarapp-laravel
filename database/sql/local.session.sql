SELECT js.jobNumber, d.name as District, l.name as Location, vt.name from job_sites js
INNER JOIN districts d ON js.district_id = d.id
INNER JOIN locations l on js.location_id = l.id
INNER JOIN job_vehicles jv ON js.id = jv.job_id
INNER JOIN vehicles v ON jv.vehicle_id = v.id
INNER JOIN vehicle_types vt ON v.vehicle_type_id = vt.id;

