# Culture Bump Directory

## Web Address
http://culture-directory.surge.sh/

## Purpose
The purpose of this application is to categorize and display user generated information on the subject of culture according to the principles of the Culture Bump Approach. By organizing cultural data in this manner, the app will highlight for users the underlying universal situations and qualities found amongst different people. 

The app also features a user form that digitally recreates the Culture Bump Approach's 8 Steps Tool, which studies show has helped people effectively navigate differences and learn the unique process required to connect to anyone anywhere. 

# Features
### Login/Signup
* This feature allows users to create profiles in order to access application tools and save their data.

### Database/ API
* This feature allows the users to store their cultural data and add it to the main Culture Directory so others can learn from it.

### Tag System
* This feature allows users to add tags to their account describing their cultural background. With this system in place, user generated cultural data can be more credible as users can only add data pertaining to cultures they have listed a familiarity with or background in. 

# User Flow
### Signup/Login
When users **sign up**, they are redirected to their **profile page** where they can further craft their profiles. When users **log in**, they are directed to the main public **Directory page**. 

### Navbar
The main features accessible on the Navbar are the **“Directory” page**, which allows users to navigate through user generated cultural data, the **“8 Step Tool” page**, which allows them to generate their own culture data points, and the **Profile page**, where they view their data submissions and add them to the public Directory.

### 8 Step Tool
After accessing the **8 Step Tool page** and submitting the form, it redirects them back to the main **Directory page**. 

### User Profile
To access their saved form submission, they can use the **Navbar** to navigate to the Profile page. Once on the **profile page**, the user can choose to either delete their various submissions or add them to the public Directory using the buttons above their submissions. The **Add to Directory button** leads the users to a page where they can format the submission’s public Directory title and choose its location within the Directory’s category and subcategory structure. Once submitted, users are redirected to the **Directory page** where they can view all the public submissions.

# Technology Stack
* React
* Javascript
* Node
* Express
* Postgresql

# Other Notable Libraries and Packages
* React Bootstrap
* React Widgets

# Tests
### Run Tests
`jest`

# API
## **USER ENDPOINTS**
### POST REQUESTS
### Register a User (POST)
`https://culture-directory.surge.sh/users/register`

Request Body

```json
{                                       
    "name": "Ben",
    "email": "test@gmailcom", 
    "username": "Ben",
    "password": "password"             
}
```

Request Response (as String)

```
<<token>>
```
### Log in a User (POST)
`https://culture-directory.surge.sh/users/token`

Request Body

```json
{ 
  "username": "Ben", 
  "password": "password!" 
}
```

Request Response (as String)

```
<<token>>
```

### Add Tag to User (POST)
`https://culture-directory.surge.sh/users/<<username>>/tags`

Request Body

```json
{ "tag": "Canada" }
```

Request Response

```json
{ 
  "user_id": "Ben", 
  "tag_id": 7 
}
```
### PATCH REQUESTS
### Update User Data (PATCH)
`https://culture-directory.surge.sh/users/<<username>>`

Request Body
(Password is an optional parameter)

```json
{                                       
    "email": "Ben@gmail.com", 
    "name": "Benny", 
    "password": "!!password!!"            
}
```

Request Response

```json
{ "username": "Ben" }
```

### GET REQUESTS
### Get User Data (GET)
`https://culture-directory.surge.sh/users/<<username>>`

(No Request Body Required)

Request Response

```json
{ 
    "username": "Ben", 
    "email": "test@gmail.com", 
    "name": "Ben" 
}

```
### Get User Reference Points (GET)
`https://culture-directory.surge.sh/users/<<username>>/referencePoints`

(No Request Body Required)

Request Response

```json
[
  {
    "id": 1,
    "type": "Positive",
    "sparker": "My teacher",
    "thought": "surprising",
    "observation": "She told me I was late and to wait outside",
    "response": "I said okay",
    "emotions": "surpise, embarrassed",
    "universal": "Arriving late to class",
    "action": "I step inside, greet the teacher as I walk to a seat",
    "qualities": "respectful",
    "connection_point": "I have never thought about it",
    "user_id": "Ben"
  }
]
```

### Get User Tags (GET)
`https://culture-directory.surge.sh/users/<<username>>/tags`

(No Request Body Required)

Request Response
```json
[ 
  { 
    "tag": "Algeria", 
    "id": 1 
  } 
]
```

## **REFERENCE POINT ENDPOINTS**
### POST REQUESTS
### Create Reference Point (POST)
`https://culture-directory.surge.sh/directory/`

Request Body

```json
{
    "type": "Positive",
    "spark": "My teacher",
    "thought": "surprising",
    "observation": "She told me I was late and to wait outside",
    "response": "I said okay",
    "emotions": "surpise, embarrassed",
    "universal": "Arriving late to class",
    "action": "I step inside, greet the teacher as I walk to a seat",
    "qualities": "respectful",
    "connectionpoint": "Sample",
    "username": "Ben"
}
```

Request Response (as String)

```json
{
    "type": "Positive",
    "sparker": "My teacher",
    "thought": "surprising",
    "observation": "She told me I was late and to wait outside",
    "response": "I said okay",
    "emotions": "surpise, embarrassed",
    "universal": "Arriving late to class",
    "action": "I step inside, greet the teacher as I walk to a seat",
    "qualities": "respectful",
    "connection_point": "Sample",
    "user_id": "Ben"
}

```

### PATCH REQUESTS
### Update Reference Point (PATCH)
`https://culture-directory.surge.sh/directory/<<id>>`

Request Body
```json
{
  "header_situation_id": { 
    "id": 1, 
    "header_situation": "When I arrive late" 
  },
  "header_specification_id": { 
    "id": 1, 
    "header_specification": "to class" 
  },
  "header_tag_id": { 
    "tag": "Algeria", 
    "id": 1 
  },
  "category_id": { 
    "id": 1, 
    "category": "in school" 
  },
  "subcategory_id": { 
    "id": 1, 
    "subcategory": "interacting with the teacher" 
  }
}

```

Request Response

```json
{ "id": 1 }
```

### Get Basic Reference Point Information (GET)
`https://culture-directory.surge.sh/steps/<<id>>`

(No Request Body Required)

Request Response
```json
{ 
    "type": "Positive",
    "sparker": "My teacher",
    "thought": "surprising",
    "observation": "She told me I was late and to wait outside",
    "response": "I said okay",
    "emotions": "surpise, embarrassed",
    "universal": "Arriving late to class",
    "action": "I step inside, greet the teacher as I walk to a seat",
    "qualities": "respectful",
    "connection_point": "Sample",
    "user_id": "Ben"
} 
```

### DELETE REQUESTS
### Delete Reference Point (DELETE)
`https://culture-directory.surge.sh/directory/<<id>>`

(No Request Body Required)

Request Response
```json
{ "deleted": "7" }
```

## **DIRECTORY INFORMATION ENDPOINTS**
### GET REQUESTS
### Create Reference Point (GET)
`https://culture-directory.surge.sh/directory/<<id>>`

(No Request Body Required)

Request Response

```json
{
    "id": 1,           
    "universal": "Arriving late to class",
    "action": "I step inside, greet the teacher as I walk to a seat",
    "qualities": "respectful",
    "user_id": "AlgerianStudents",  
    "tag": "Algeria",
    "headerspecification": "to class",
    "headersituation": "When I arrive late"
}

```

### Get All Tags (GET)
`https://culture-directory.surge.sh/directory/tags`

(No Request Body Required)

Request Response

```json
[
  { 
    "id": 1, 
    "tag": "Algeria"
  }
]


```

### Get All Categories (GET)
`https://culture-directory.surge.sh/directory/categories`

(No Request Body Required)

Request Response

```json
[
  { 
    "id": 1, 
    "category": "in school"
  }
]
```

### Get All Subcategories with Matching Category Id (GET)
`https://culture-directory.surge.sh/directory/categories/<<id>>`

(No Request Body Required)

Request Response

```json
[
  { 
    "categoryid": 1,
    "subcategory": "classroom etiquette",
    "subcategoryid": 4
  }
]
```

### Get Headers Info with Matching Category Id and Subcategory Id (GET)
`https://culture-directory.surge.sh/directory/categories/<<categoryId>>/subcategories/<<subcategoryId>>`

(No Request Body Required)

Request Response

```json
[
  { 
    "id": 1,
    "user_id": "Ben",
    "headersituation": "When I arrive late",
    "tag": "Algeria",
    "headerspecification": "to class"
  }
]
```

### Get User’s Header Values (GET)
`https://culture-directory.surge.sh/directory/header/<<username>>`

(No Request Body Required)

Request Response

```json
{
  "headerSituation": [
    { 
      "id": 1, 
      "header_situation": "When I arrive late"
    }
  ],
  "headerSpecification": [
    { 
      "id": 1, 
      "header_specification": "to class"
    }
  ],
  "categories": [
    { 
      "id": 1, 
      "category": "in school" 
    }
  ],
  "subcategories": [
    { 
      "id": 4, 
      "subcategory": "classroom etiquette" 
    }
  ],
  "userTags": [
    { 
      "tag": "Algeria", 
      "id": 1 
    },
  ]
}
```