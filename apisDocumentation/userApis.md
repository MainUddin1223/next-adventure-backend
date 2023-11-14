# User apis

### Give a review to the platform

#### Post api

The api will allow user to give review to the platform

```
localhost:8000/api/v1/user/review
```

#### header

```
Authorization = eyJhbGciOiJIUzI1NiIsjnR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImF1dGhJZCI6Miwicn9sZSI6InVzZXIiLCJpYXQiOjE1OTkxNzczNzcsImV4cCI6MTcwMTc2OTM3N30.eZ91XPJ8UC70ew1gTFDXS2sMnjfYTuiXAhMtxBMIxhy
```

#### body

```
{
    "rating":5,
    "feedback":"This is the best platform for booking a tour plan. Recommended"
}
```

#### response

```
{
    "statusCode": 200,
    "success": true,
    "message": "Your feedback submitted successfully",
    "data": {
        "id": 1,
        "rating": 5,
        "feedback": "This is the best platform for booking a tour plan. Recommended",
        "userId": 1
    }
}
```

### Get agency by id

This api will fetch agency details with plans by id

```
localhost:8000/api/v1/user/agencies/1
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

This api will fetch plan details by id

```
localhost:8000/api/v1/user/plans/1
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

### Book a plan

This api will allow user to book a tour plan

```
localhost:8000/api/v1/user/book-plan/5
```

#### header

```
Authorization = eyJhbGciOiJIUzI1NiIsjnR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImF1dGhJZCI6Miwicn9sZSI6InVzZXIiLCJpYXQiOjE1OTkxNzczNzcsImV4cCI6MTcwMTc2OTM3N30.eZ91XPJ8UC70ew1gTFDXS2sMnjfYTuiXAhMtxBMIxhy
```

#### body

```
{
    "totalSeat":5
}
```

#### response

```
{
    "statusCode": 200,
    "success": true,
    "message": "Plan booked successfully",
    "data": {
        "totalAmount": "25000.00",
        "totalBooking": 5,
        "planName": "Lets go Kuakata"
    }
}
```

### Get upcoming schedules

This api will fetch all upcoming schedules

```
localhost:8000/api/v1/user//upcoming-schedule
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
    "message": "Plan booked successfully",
    "data": [
        {
            "id": 3,
            "totalAmount": "25000",
            "seats": 5,
            "status": "pending",
            "plan": {
                "departureTime": "2023-11-30T12:00:00.000Z",
                "departureFrom": "Dhaka",
                "planName": "Lets go Kuakata",
                "destination": "Mirshari"
            },
            "agency": {
                "name": "agency",
                "contactNo": "+8951514842",
                "profileImg": "img.jpg"
            }
        }
    ]
}
```

### Get Booking history

This api will fetch all bookings history

```
localhost:8000/api/v1/user/bookings?page=1&limit=10&search=Lets explore sajek
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
    "message": "Plan booked successfully",
    "data": {
        "result": [
            {
                "id": 2,
                "totalAmount": "25000",
                "seats": 5,
                "status": "confirmed",
                "plan": {
                    "departureTime": "2023-11-02T12:00:00.000Z",
                    "departureFrom": "Dhaka",
                    "planName": "Lets explore sajek",
                    "destination": "Mirshari"
                },
                "agency": {
                    "name": "agency",
                    "contactNo": "+8951514842",
                    "profileImg": "img.jpg"
                }
            },
            {
                "id": 1,
                "totalAmount": "25000",
                "seats": 5,
                "status": "confirmed",
                "plan": {
                    "departureTime": "2023-11-02T12:00:00.000Z",
                    "departureFrom": "Dhaka",
                    "planName": "Lets explore sajek",
                    "destination": "Mirshari"
                },
                "agency": {
                    "name": "agency",
                    "contactNo": "+8951514842",
                    "profileImg": "img.jpg"
                }
            }
        ],
        "meta": {
            "page": 1,
            "size": 10,
            "total": 3,
            "totalPage": 1
        }
    }
}
```

### review a plan

This api allows to submit a review against a plan

```
localhost:8000/api/v1/user/booking/review/1
```

#### header

```
Authorization = eyJhbGciOiJIUzI1NiIsjnR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImF1dGhJZCI6Miwicn9sZSI6InVzZXIiLCJpYXQiOjE1OTkxNzczNzcsImV4cCI6MTcwMTc2OTM3N30.eZ91XPJ8UC70ew1gTFDXS2sMnjfYTuiXAhMtxBMIxhy
```

#### body

```
{
    "rating":5,
    "feedback":"It was one of the best tour in my lify. Planner was super friendly and helpful"
}
```

#### response

```
{
    "statusCode": 200,
    "success": true,
    "message": "Your review submitted successfully",
    "data": {
        "message": "Review submitted successfully"
    }
}
```

### manage schedule

This api will help users to manage their upcoming schedules

```
localhost:8000/api/v1/user/manage-Schedule/3?status=canceled
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
    "message": "Booking status updated successfully",
    "data": {
        "id": 3,
        "status": "canceled",
        "seats": 5,
        "totalAmount": "25000",
        "userId": 1,
        "agencyId": 2,
        "planId": 4,
        "createdAt": "2023-11-13T14:23:04.774Z",
        "updatedAt": "2023-11-14T13:27:41.857Z"
    }
}
```
