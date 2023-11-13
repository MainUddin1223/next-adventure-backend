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

### Get agencies

This api will fetch all agencies

```
localhost:8000/api/v1/user/agencies?page=1&limit=10&search=agency
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
    "message": "Agencies retrieved successfully",
    "data": {
        "result": [
            {
                "id": 2,
                "name": "agency",
                "profileImg": "img.jpg",
                "rating": "0",
                "totalReviews": 0,
                "totalStar": "0"
            },
            {
                "id": 1,
                "name": "agency",
                "profileImg": "img.jpg",
                "rating": "0",
                "totalReviews": 0,
                "totalStar": "0"
            }
        ],
        "meta": {
            "page": 1,
            "size": 10,
            "total": 2,
            "totalPage": 1
        }
    }
}
```

### Get plans

This api will retrieve all upcoming plans

```
localhost:8000/api/v1/user/plans?page=1&limit=10&search=mohamaya
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
    "message": "Tour Plans retrieved successfully",
    "data": {
        "result": [
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
                "price": "5000",
                "agency": {
                    "name": "agency",
                    "location": "Dhaka",
                    "id": 1
                }
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
