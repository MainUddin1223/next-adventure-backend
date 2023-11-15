# Agency apis

### Create plans

This api will help agency to create a plan

```
localhost:8000/api/v1/agency/create-plan
```

#### header

```
Authorization = eyJhbGciOiJIUzI1NiIsjnR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImF1dGhJZCI6Miwicn9sZSI6InVzZXIiLCJpYXQiOjE1OTkxNzczNzcsImV4cCI6MTcwMTc2OTM3N30.eZ91XPJ8UC70ew1gTFDXS2sMnjfYTuiXAhMtxBMIxhy
```

#### body

```
{
  "planName": "Lets explore Saint martin",
  "images": ["http://res.cloudinary.com/dld6ete1x/image/upload/v1697888404/cucfnz16aihpisavbxwc.jpg"],
  "destination": "Mirshari",
  "departureFrom": "Dhaka",
  "duration": "3 days",
  "meals": "7 meals",
  "price": 5000,
  "coverLocations": ["Mohamaya eco park","Guliakhali sea beach"],
  "events": ["Hiking", "Camping","kayaking"],
  "notAllowed": ["Drags", "Alcohol"],
  "departureTime": "2023-11-30T12:00:00Z",
  "description": "Your Plan Description",
  "deadline": "2023-11-25T23:59:59Z",
  "totalSeats": 20
}
```

#### response

```
{
    "statusCode": 200,
    "success": true,
    "message": "Plan created successfully",
    "data": {
        "id": 6,
        "agencyId": 2,
        "planName": "Lets explore Saint martin",
        "destination": "Mirshari",
        "departureFrom": "Dhaka",
        "coverLocations": [
            "Mohamaya eco park",
            "Guliakhali sea beach"
        ],
        "price": "5000",
        "images": [
            "http://res.cloudinary.com/dld6ete1x/image/upload/v1697888404/cucfnz16aihpisavbxwc.jpg"
        ],
        "duration": "3 days",
        "description": "Your Plan Description",
        "departureTime": "2023-11-30T12:00:00.000Z",
        "meals": "7 meals",
        "events": [
            "Hiking",
            "Camping",
            "kayaking"
        ],
        "notAllowed": [
            "Drags",
            "Alcohol"
        ],
        "deadline": "2023-11-25T23:59:59.000Z",
        "featured": false,
        "status": "available",
        "totalSeats": 20,
        "totalBooking": 0,
        "createdAt": "2023-11-14T13:54:21.918Z",
        "updatedAt": "2023-11-14T13:54:21.918Z"
    }
}
```

### Update plan

This api will help agency to update a plan

```
localhost:8000/api/v1/agency/plan/6
```

#### header

```
Authorization = eyJhbGciOiJIUzI1NiIsjnR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImF1dGhJZCI6Miwicn9sZSI6InVzZXIiLCJpYXQiOjE1OTkxNzczNzcsImV4cCI6MTcwMTc2OTM3N30.eZ91XPJ8UC70ew1gTFDXS2sMnjfYTuiXAhMtxBMIxhy
```

#### Body

```
{
    "destination":"Saint martin",
    "price":10000
}
```

#### response

```
{
    "statusCode": 200,
    "success": true,
    "message": "Plan updated successfully",
    "data": {
        "id": 1,
        "agencyId": 2,
        "planName": "Lets go Mohamaya2",
        "destination": "Saint martin",
        "departureFrom": "Dhaka",
        "coverLocations": [
            "Mohamaya eco park",
            "Guliakhali sea beach"
        ],
        "price": "10000",
        "images": [
            "http://res.cloudinary.com/dld6ete1x/image/upload/v1697888404/cucfnz16aihpisavbxwc.jpg"
        ],
        "duration": "3 days",
        "description": "Your Plan Description",
        "departureTime": "2023-11-30T12:00:00.000Z",
        "meals": "7 meals",
        "events": [
            "Hiking",
            "Camping",
            "kayaking"
        ],
        "notAllowed": [
            "Drags",
            "Alcohol"
        ],
        "deadline": "2023-11-25T23:59:59.000Z",
        "featured": false,
        "status": "available",
        "totalSeats": 20,
        "totalBooking": 0,
        "createdAt": "2023-11-06T06:25:41.209Z",
        "updatedAt": "2023-11-14T13:58:57.486Z"
    }
}
```

### get all plans

This api will help agency to fetch all his plans

```
localhost:8000/api/v1/agency/plans/?page=1&limit=10&search=saint martin
```

#### header

```
Authorization = eyJhbGciOiJIUzI1NiIsjnR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImF1dGhJZCI6Miwicn9sZSI6InVzZXIiLCJpYXQiOjE1OTkxNzczNzcsImV4cCI6MTcwMTc2OTM3N30.eZ91XPJ8UC70ew1gTFDXS2sMnjfYTuiXAhMtxBMIxhy
```

#### response

```
{
    "statusCode": 200,
    "success": true,
    "message": "Plans retrieved successfully",
    "data": {
        "result": [
            {
                "id": 6,
                "agencyId": 2,
                "planName": "Lets explore Saint martin",
                "destination": "Mirshari",
                "departureFrom": "Dhaka",
                "coverLocations": [
                    "Mohamaya eco park",
                    "Guliakhali sea beach"
                ],
                "price": "5000",
                "images": [
                    "http://res.cloudinary.com/dld6ete1x/image/upload/v1697888404/cucfnz16aihpisavbxwc.jpg"
                ],
                "duration": "3 days",
                "description": "Your Plan Description",
                "departureTime": "2023-11-30T12:00:00.000Z",
                "meals": "7 meals",
                "events": [
                    "Hiking",
                    "Camping",
                    "kayaking"
                ],
                "notAllowed": [
                    "Drags",
                    "Alcohol"
                ],
                "deadline": "2023-11-25T23:59:59.000Z",
                "featured": false,
                "status": "available",
                "totalSeats": 20,
                "totalBooking": 0,
                "createdAt": "2023-11-14T13:54:21.918Z",
                "updatedAt": "2023-11-14T13:54:21.918Z",
                "bookings": []
            },
            {
                "id": 1,
                "agencyId": 2,
                "planName": "Lets go Mohamaya2",
                "destination": "Saint martin",
                "departureFrom": "Dhaka",
                "coverLocations": [
                    "Mohamaya eco park",
                    "Guliakhali sea beach"
                ],
                "price": "10000",
                "images": [
                    "http://res.cloudinary.com/dld6ete1x/image/upload/v1697888404/cucfnz16aihpisavbxwc.jpg"
                ],
                "duration": "3 days",
                "description": "Your Plan Description",
                "departureTime": "2023-11-30T12:00:00.000Z",
                "meals": "7 meals",
                "events": [
                    "Hiking",
                    "Camping",
                    "kayaking"
                ],
                "notAllowed": [
                    "Drags",
                    "Alcohol"
                ],
                "deadline": "2023-11-25T23:59:59.000Z",
                "featured": false,
                "status": "available",
                "totalSeats": 20,
                "totalBooking": 0,
                "createdAt": "2023-11-06T06:25:41.209Z",
                "updatedAt": "2023-11-14T13:58:57.486Z",
                "bookings": []
            }
        ],
        "meta": {
            "page": 1,
            "size": 10,
            "total": 4,
            "totalPage": 1
        }
    }
}
```

### get upcoming schedules

This api will help agency to fetch all his upcoming schedules

```
localhost:8000/api/v1/agency/upcoming-schedules?page=1&limit=10&search=saint martin
```

#### header

```
Authorization = eyJhbGciOiJIUzI1NiIsjnR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImF1dGhJZCI6Miwicn9sZSI6InVzZXIiLCJpYXQiOjE1OTkxNzczNzcsImV4cCI6MTcwMTc2OTM3N30.eZ91XPJ8UC70ew1gTFDXS2sMnjfYTuiXAhMtxBMIxhy
```

#### response

```
{
    "statusCode": 200,
    "success": true,
    "message": "Upcoming schedules retrieved successfully",
    "data": {
        "result": [
            {
                "id": 1,
                "agencyId": 2,
                "planName": "Lets go Mohamaya2",
                "destination": "Saint martin",
                "departureFrom": "Dhaka",
                "coverLocations": [
                    "Mohamaya eco park",
                    "Guliakhali sea beach"
                ],
                "price": "10000",
                "images": [
                    "http://res.cloudinary.com/dld6ete1x/image/upload/v1697888404/cucfnz16aihpisavbxwc.jpg"
                ],
                "duration": "3 days",
                "description": "Your Plan Description",
                "departureTime": "2023-11-30T12:00:00.000Z",
                "meals": "7 meals",
                "events": [
                    "Hiking",
                    "Camping",
                    "kayaking"
                ],
                "notAllowed": [
                    "Drags",
                    "Alcohol"
                ],
                "deadline": "2023-11-25T23:59:59.000Z",
                "featured": false,
                "status": "available",
                "totalSeats": 20,
                "totalBooking": 0,
                "createdAt": "2023-11-06T06:25:41.209Z",
                "updatedAt": "2023-11-14T13:58:57.486Z",
                "bookings": []
            }
        ],
        "meta": {
            "page": 1,
            "size": 10,
            "total": 4,
            "totalPage": 1
        }
    }
}
```

### get plan details by id

This api will help agency to get plan details

```
localhost:8000/api/v1/agency/plan/1
```

#### header

```
Authorization = eyJhbGciOiJIUzI1NiIsjnR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImF1dGhJZCI6Miwicn9sZSI6InVzZXIiLCJpYXQiOjE1OTkxNzczNzcsImV4cCI6MTcwMTc2OTM3N30.eZ91XPJ8UC70ew1gTFDXS2sMnjfYTuiXAhMtxBMIxhy
```

#### response

```
{
    "statusCode": 200,
    "success": true,
    "message": "Plan details retrieved successfully",
    "data": {
        "id": 1,
        "agencyId": 2,
        "planName": "Lets go Mohamaya2",
        "destination": "Saint martin",
        "departureFrom": "Dhaka",
        "coverLocations": [
            "Mohamaya eco park",
            "Guliakhali sea beach"
        ],
        "price": "10000",
        "images": [
            "http://res.cloudinary.com/dld6ete1x/image/upload/v1697888404/cucfnz16aihpisavbxwc.jpg"
        ],
        "duration": "3 days",
        "description": "Your Plan Description",
        "departureTime": "2023-11-30T12:00:00.000Z",
        "meals": "7 meals",
        "events": [
            "Hiking",
            "Camping",
            "kayaking"
        ],
        "notAllowed": [
            "Drags",
            "Alcohol"
        ],
        "deadline": "2023-11-25T23:59:59.000Z",
        "featured": false,
        "status": "available",
        "totalSeats": 20,
        "totalBooking": 0,
        "createdAt": "2023-11-06T06:25:41.209Z",
        "updatedAt": "2023-11-14T13:58:57.486Z"
    }
}
```
