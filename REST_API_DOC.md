# ourRytm App Server

ourRytm App is an application to search recipes based on keyword. This app has:

-   Login using Google account
-   Search song (client) on deezer API database
-   Send email using mailGun API
-   Check email is valid using mailValidator API


# RESTFul Endpoints

List Endpoints :
- `POST /login`
- `POST /register`
- `GET /api/:songTitle`
- `POST /googleSignIn`


#### (401 - Unauthorized)

> This error describes invalid user on resources access attempt

```json
{
    "error_code": "INVALID_USER",
    "message": "invalid username and password"
}
```

> This error describes access token missing

```json
{
    "message": "Access token missing!"
}
```

#### (404 - Not Found)

> This error describes user not exists

```json
{
    "error_code": "USER_NOT_FOUND",
    "message": "invalid username and password"
}
```

#### Response (500 - Internal server error)

> This error describes server errors and undefined errors

```json
{
    "error_code": "INTERNAL_SERVER_ERROR",
    "message": "Internal server error!"
}
```

---

## USER

### POST /register

> Create new user


#### Request Body

| Field    |  Type  | 
| :------- | :----: | 
| email    | String | 
| password | String | 

_Example:_

```json
{
    "email": "user@example.com",
    "password": "password"
}
```

#### Response (201 - Created)

```json
{
    "id": 1,
    "email": "fetuvici@gmail.com"
}
```

#### Response (400 - Bad Request)

```json
{
    "error_code": "SequelizeValidationError",
    "message": [
        "name is required",
        "Email already Registered",
        "Email is required",
        "email is not valid",
        "Password is required",
    ]
}
```

---

### POST /login

> Login user


#### Request Body

| Field    |  Type  |
| :------- | :----: |
| email    | String |
| password | String |

_Example:_

```json
{
    "email": "user@example.com",
    "password": "password"
}
```

#### Response (200 - OK)

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTkxNzE2MDQ1fQ.Qxvchgcala47BVY0oCUUQ7XWO4ll0iAebJQEM_OpHYA"
}
```

#### Response (401 - Unauthorized)

```json
{
    "error_code": "INVALID_EMAIL",
    "message": "invalid username and password!"
}
```

---

### POST /google

> Register or Login user using Google account

#### Request Body

| Field        |  Type  |
| :----------- | :----: |
| google_token | String |

_Example:_

```json
{
    "google_token": "eyJpZCI6MSwiaWF0IjoxNT...ll0iAebJQEM_OpHYA"
}
```

### Get /api/:songTitle

```params
taylor
````

```json
[
    {
        "title": "Taylor",
        "preview": "https://cdns-preview-c.dzcdn.net/stream/c-ca6884f3a43ea9e8a926eb922971d895-4.mp3",
        "picture": "https://cdns-images.dzcdn.net/images/artist/5ab2307c596f9814abcd223467c54fb2/1000x1000-000000-80-0-0.jpg"
    },
    {
        "title": "Shake It Off",
        "preview": "https://cdns-preview-2.dzcdn.net/stream/c-24b54c7669050cf223dd66487061712c-7.mp3",
        "picture": "https://cdns-images.dzcdn.net/images/artist/254e356010a50dd4dababc4b50856a55/1000x1000-000000-80-0-0.jpg"
    },
    {
        "title": "I Knew You Were Trouble.",
        "preview": "https://cdns-preview-4.dzcdn.net/stream/c-48d1036bfc032a768e52934cea0569ce-7.mp3",
        "picture": "https://cdns-images.dzcdn.net/images/artist/254e356010a50dd4dababc4b50856a55/1000x1000-000000-80-0-0.jpg"
    },
    ....
]
```