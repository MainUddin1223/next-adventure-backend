# Authenticated apis

### Get agency by id

The api will fetch specific agency data based of id

```
localhost:8000/api/v1/user/agencies/1
```

header

```
Authorization = eyJhbGciOiJIUzI1NiIsjnR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImF1dGhJZCI6Miwicn9sZSI6InVzZXIiLCJpYXQiOjE1OTkxNzczNzcsImV4cCI6MTcwMTc2OTM3N30.eZ91XPJ8UC70ew1gTFDXS2sMnjfYTuiXAhMtxBMIxhy
```

#### response

```
{
    "statusCode": 200,
    "success": true,
    "message": "Agency data retrieved successfully",
    "data": {
        "name": "agency",
        "contactNo": "+8951514842",
        "profileImg": "img.jpg",
        "rating": "0",
        "about": "this is about",
        "plans": [
            {
                "planName": "Lets go Saint Martin",
                "id": 3,
                "departureTime": "2023-11-30T12:00:00.000Z",
                "departureFrom": "Dhaka",
                "deadline": "2023-11-25T23:59:59.000Z",
                "destination": "Mirshari",
                "images": [
                    "http://res.cloudinary.com/dld6ete1x/image/upload/v1697888404/cucfnz16aihpisavbxwc.jpg"
                ],
                "price": "5000"
            },
            {
                "planName": "Lets go Kaptai",
                "id": 2,
                "departureTime": "2023-11-30T12:00:00.000Z",
                "departureFrom": "Dhaka",
                "deadline": "2023-11-25T23:59:59.000Z",
                "destination": "Mirshari",
                "images": [
                    "http://res.cloudinary.com/dld6ete1x/image/upload/v1697888404/cucfnz16aihpisavbxwc.jpg"
                ],
                "price": "5000"
            },
            {
                "planName": "Lets go Mohamaya2",
                "id": 1,
                "departureTime": "2023-11-30T12:00:00.000Z",
                "departureFrom": "Dhaka",
                "deadline": "2023-11-25T23:59:59.000Z",
                "destination": "Mirshari",
                "images": [
                    "http://res.cloudinary.com/dld6ete1x/image/upload/v1697888404/cucfnz16aihpisavbxwc.jpg"
                ],
                "price": "5000"
            }
        ]
    }
}
```

### Get plan by id

The api will fetch specific plan data based of id

```
localhost:8000/api/v1/user/plan/1
```

header

```
Authorization = eyJhbGciOiJIUzI1NiIsjnR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImF1dGhJZCI6Miwicn9sZSI6InVzZXIiLCJpYXQiOjE1OTkxNzczNzcsImV4cCI6MTcwMTc2OTM3N30.eZ91XPJ8UC70ew1gTFDXS2sMnjfYTuiXAhMtxBMIxhy
```

#### response

```
{
    "statusCode": 200,
    "success": true,
    "message": "Plan data retrieved successfully",
    "data": {
        "planName": "Lets go Mohamaya2",
        "id": 1,
        "departureFrom": "Dhaka",
        "departureTime": "2023-11-30T12:00:00.000Z",
        "price": "5000",
        "duration": "3 days",
        "coverLocations": [
            "Mohamaya eco park",
            "Guliakhali sea beach"
        ],
        "meals": "7 meals",
        "description": "Your Plan Description",
        "images": [
            "http://res.cloudinary.com/dld6ete1x/image/upload/v1697888404/cucfnz16aihpisavbxwc.jpg"
        ],
        "deadline": "2023-11-25T23:59:59.000Z",
        "destination": "Mirshari",
        "events": [
            "Hiking",
            "Camping",
            "kayaking"
        ],
        "agency": {
            "name": "agency",
            "id": 1,
            "rating": "0",
            "profileImg": "img.jpg"
        }
    }
}
```
