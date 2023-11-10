# Public apis

### Get landing page data

The api will fetch featured agencies,plans,reviews in order to visualize on landing page

```
localhost:8000/api/v1/user/data
```

#### response

```
{
    "statusCode": 200,
    "success": true,
    "message": "Data fetched successfully",
    "data": {
        "plans": [],
        "agencies": [],
        "reviews": []
    }
}
```

### Get agencies

The api will fetch agencies

```
localhost:8000/api/v1/user/agencies?page=1&limit=10&search=agency
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

The api will fetch plans

```
localhost:8000/api/v1/user/plans?page=1&limit=10&search=agency
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
