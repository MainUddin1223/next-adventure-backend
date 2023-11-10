## Next adventure apis endpoints

### Public apis

#### Get landing page data

The api will fetch featured agencies,plans,reviews in order to visualize on landing page

```
localhost:8000/api/v1/user/data
```

##### response

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

#### Get agencies

The api will fetch agencies

```
localhost:8000/api/v1/user/agencies?page=1&limit=10&search=agency
```

##### response

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
