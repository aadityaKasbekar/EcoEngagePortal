# EcoEngage Portal

Connecting communities for sustainable actions and environmental impact.

## Description

The EcoEngage Portal is an online platform designed to raise awareness and promote action on climate change. It offers a wide range of features and functionalities to engage users in environmental initiatives and sustainability efforts.

The platform allows users to create and share posts about climate change initiatives they are organizing or supporting. It also provides tools for users to calculate their carbon footprint, receive personalized recommendations for reducing emissions, and track their progress over time. Additionally, users can contribute monetarily to tree plantation efforts and participate in events focused on environmental conservation.

The portal integrates real-time emissions information about the various greenhouse gases, users can view how many million tonnes of Methan, Carbon Monoxide, Nitrogen Dioxide and Ozone are emitted of varying time intervals (Yearly, Monthly, Weekly and Daily). We are using [https://api.v2.emissions-api.org] for this data, which is an open API with very detailed statistics.

Events and workshops related to climate change are showcased on the platform's events calendar, and users can collaborate with businesses and organizations on climate change projects. User authentication and profile management features ensure a personalized experience, with admins having the ability to manage user posts and comments effectively.

Overall, the EcoEngage Portal aims to empower individuals and communities to take meaningful action towards mitigating climate change and building a more sustainable future.

## Members

- Aaditya Kasbekar: [kasbekar.a@northeastern.edu](mailto:kasbekar.a@northeastern.edu)
- Akshit Saxena: [saxena.aksh@northeastern.edu](mailto:saxena.aksh@northeastern.edu)
- Ritik Gupta: [gupta.ritik@northeastern.edu](mailto:gupta.ritik@northeastern.edu)
- Sakshi Mahesh Wadaskar: [wadaskar.s@northeastern.edu](mailto:wadaskar.s@northeastern.edu)

## Mermaid code for Object Model

```mermaid
classDiagram
    class Person {
        +name: string
        +dob: date
        +gender: string
        +email: string
        +address1: string
        +city: string
        +state: string
        +zipCode: string
    }

    class User {
        +userId: int
        +points: int
        +walletAmt: int
        +register(): void
        +earnPoints(pointsEarned: int): void
    }

    class Admin {
        +grantPoints(user: User, points: int): void
        +removePost(postId: int): void
    }

    class PostCard {
        +postId: int
        +title: string
        +userId: int
        +content: string
        +likes: int
        +timeStamp: date
        +createPost(): void
        +updatePost(): void
        +deletePost(): void
    }

    class Comments {
        +commentId: int
        +postId: int
        +authorId: int
        +timeStamp: date
        +commentContent: string
    }

    class TreePlantation {
        +plantationId: int
        +location: string
        +treesPlanted: int
        +organizer: Business
        +participants: User[]
        +addParticipant(user: User): void
        +removeParticipant(user: User): void
    }

    class Reward {
        +rewardId: int
        +pointsRequired: int
        +description: string
        +redeem(): void
    }

    class userReward {
        +userId: int
        +rewardId: int
        +timeStamp: date
    }

    class Business {
        +businessId: int
        +name: string
        +location: string
    }

    class Event {
        +eventId: int
        +title: string
        +description: string
        +location: string
        +startDate: date
        +endDate: date
        +participants: User[]
        +organizer: Business
        +addParticipant(user: User): void
        +removeParticipant(user: User): void
    }

    class AQIDataService {
        +apiKey: string
        +getRealTimeAQI(location: string): AQIData
        +getHistoricalAQITrends(location: string, startDate: date, endDate: date): AQIData[]
    }

    class AQIData {
        +location: string
        +timestamp: date
        +aqiValue: int
        +displayAQIInfo(): void
    }

    class CarbonFootprintCalculator {
        +calculateCarbonFootprint(userInputs: CarbonFootprintInputs): number
        +getRecommendations(userFootprint: number): string[]
    }

    class CarbonFootprintInputs {
        +transportationType: string
        +distanceTraveled: number
        +energyUsage: number
        +wasteGenerated: number
    }

    class CarbonFootprintReport {
        +user: User
        +carbonFootprintValue: number
        +recommendations: string[]
        +generateReport(): void
    }

    Person <|-- User
    Person <|-- Admin

    User "1" -- "many" PostCard : Posts
    User "many" -- "many" TreePlantation : Participates
    User "1" -- "many" userReward : Receives
    Reward "1" -- "many" userReward : Received By
    Event "many" -- "1" Business : Hosted By
    User "many" -- "many" Event : Participates In
    AQIDataService "1" -- "many" AQIData : Provides
    CarbonFootprintCalculator "1" -- "1" CarbonFootprintInputs : Uses
    CarbonFootprintCalculator "1" -- "1" CarbonFootprintReport : Generates
```

## Open API YAML Specification

```yaml
openapi: 3.0.0
info:
  title: EcoEngage Portal API
  version: 1.0.0
  description: APIs for managing users, posts, comments, rewards, events, tree plantations, AQI data, carbon footprint calculations, and authentication in the EcoEngage Portal.

servers:
  - url: https://example.com/api/v1
    description: Production server

paths:
  /register:
    post:
      summary: Register a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UserRegistration"
      responses:
        "200":
          description: User successfully registered
        "400":
          description: Bad request

  /login:
    post:
      summary: User login
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UserLogin"
      responses:
        "200":
          description: User logged in successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                    description: JWT token for authentication
        "401":
          description: Unauthorized

  /users:
    get:
      summary: Retrieve all users
      responses:
        "200":
          description: A list of users

  /users/{userId}:
    get:
      summary: Retrieve a specific user by ID
      parameters:
        - name: userId
          in: path
          description: ID of the user to retrieve
          required: true
          schema:
            type: integer
            format: int64
      responses:
        "200":
          description: User found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/User"
        "404":
          description: User not found
    put:
      summary: Update an existing user
      parameters:
        - name: userId
          in: path
          description: ID of the user to update
          required: true
          schema:
            type: integer
            format: int64
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/User"
      responses:
        "200":
          description: Updated
        "400":
          description: Bad request
        "404":
          description: User not found
    delete:
      summary: Delete a user by ID
      parameters:
        - name: userId
          in: path
          description: ID of the user to delete
          required: true
          schema:
            type: integer
            format: int64
      responses:
        "204":
          description: No content
        "404":
          description: User not found

  /posts:
    get:
      summary: Get all posts
      responses:
        "200":
          description: List of posts
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/PostCard"
        "401":
          description: Unauthorized

    post:
      summary: Create a new post
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/NewPost"
      responses:
        "201":
          description: PostCard created successfully
        "401":
          description: Unauthorized
        "400":
          description: Bad request

  /posts/{postId}:
    get:
      summary: Get a specific post
      parameters:
        - name: postId
          in: path
          required: true
          description: ID of the post to retrieve
          schema:
            type: integer
      responses:
        "200":
          description: PostCard details
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PostCard"
        "401":
          description: Unauthorized
        "404":
          description: PostCard not found

    patch:
      summary: Update a post
      parameters:
        - name: postId
          in: path
          required: true
          description: ID of the post to update
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UpdatePost"
      responses:
        "200":
          description: PostCard updated successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PostCard"
        "401":
          description: Unauthorized
        "403":
          description: Forbidden (User is not authorized)
        "404":
          description: PostCard not found

    delete:
      summary: Delete a post
      parameters:
        - name: postId
          in: path
          required: true
          description: ID of the post to delete
          schema:
            type: integer
      responses:
        "204":
          description: PostCard deleted successfully
        "401":
          description: Unauthorized
        "403":
          description: Forbidden (User is not an admin)
        "404":
          description: PostCard not found

  /posts/{postId}/comments:
    get:
      summary: Get comments for a post
      parameters:
        - name: postId
          in: path
          required: true
          description: ID of the post
          schema:
            type: integer
      responses:
        "200":
          description: List of comments
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Comment"
        "401":
          description: Unauthorized
        "404":
          description: PostCard not found

    post:
      summary: Add a comment to a post
      parameters:
        - name: postId
          in: path
          required: true
          description: ID of the post
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/NewComment"
      responses:
        "201":
          description: Comment added successfully
        "401":
          description: Unauthorized
        "404":
          description: PostCard not found
        "400":
          description: Bad request

  /posts/{postId}/comments/{commentId}:
    put:
      summary: Update a comment
      parameters:
        - name: postId
          in: path
          required: true
          description: ID of the post containing the comment
          schema:
            type: integer
        - name: commentId
          in: path
          required: true
          description: ID of the comment to update
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UpdateComment"
      responses:
        "200":
          description: Comment updated successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Comment"
        "401":
          description: Unauthorized
        "403":
          description: Forbidden (User is not authorized)
        "404":
          description: Comment not found

    delete:
      summary: Delete a comment
      parameters:
        - name: postId
          in: path
          required: true
          description: ID of the post containing the comment
          schema:
            type: integer
        - name: commentId
          in: path
          required: true
          description: ID of the comment to delete
          schema:
            type: integer
      responses:
        "204":
          description: Comment deleted successfully
        "401":
          description: Unauthorized
        "403":
          description: Forbidden (User is not authorized)
        "404":
          description: Comment not found

  /events:
    get:
      summary: Get all events
      responses:
        "200":
          description: List of events
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Event"
        "401":
          description: Unauthorized

    post:
      summary: Create a new event
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/NewEvent"
      responses:
        "201":
          description: Event created successfully
        "401":
          description: Unauthorized
        "400":
          description: Bad request

  /aqi:
    get:
      summary: Get real-time AQI data
      parameters:
        - name: location
          in: query
          required: true
          description: Location for AQI data
          schema:
            type: string
      responses:
        "200":
          description: Real-time AQI data
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/AQIData"
        "401":
          description: Unauthorized
        "404":
          description: Location not found

  /carbon-footprint:
    post:
      summary: Calculate carbon footprint
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/CarbonFootprintInputs"
      responses:
        "200":
          description: Carbon footprint calculated successfully
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/CarbonFootprintReport"
        "401":
          description: Unauthorized
        "400":
          description: Bad request

components:
  schemas:
    UserRegistration:
      type: object
      properties:
        name:
          type: string
          example: John Doe
        email:
          type: string
          example: johndoe@example.com
        password:
          type: string
          example: mysecretpassword
        address1:
          type: string
          example: 123 Green Street
        city:
          type: string
          example: EcoCity
        state:
          type: string
          example: EcoState
        zipCode:
          type: string
          example: 12345

    UserLogin:
      type: object
      properties:
        email:
          type: string
          example: johndoe@example.com
        password:
          type: string
          example: mysecretpassword

    User:
      type: object
      properties:
        userId:
          type: integer
          example: 123
        points:
          type: integer
          example: 500
        walletAmt:
          type: integer
          example: 100

    PostCard:
      type: object
      properties:
        postId:
          type: integer
        title:
          type: string
        userId:
          type: integer
        content:
          type: string
        likes:
          type: integer
        timeStamp:
          type: string
          format: date-time

    NewPost:
      type: object
      properties:
        title:
          type: string
        content:
          type: string

    UpdatePost:
      type: object
      properties:
        content:
          type: string
      required:
        - content

    Comment:
      type: object
      properties:
        commentId:
          type: integer
        postId:
          type: integer
        authorId:
          type: integer
        timeStamp:
          type: string
          format: date-time
        commentContent:
          type: string

    NewComment:
      type: object
      properties:
        postId:
          type: integer
        authorId:
          type: integer
        commentContent:
          type: string

    UpdateComment:
      type: object
      properties:
        commentContent:
          type: string
      required:
        - commentContent

    Event:
      type: object
      properties:
        eventId:
          type: integer
        title:
          type: string
        description:
          type: string
        location:
          type: string
        startDate:
          type: string
          format: date
        endDate:
          type: string
          format: date
        participants:
          type: array
          items:
            $ref: "#/components/schemas/User"
        organizer:
          $ref: "#/components/schemas/Business"

    NewEvent:
      type: object
      properties:
        title:
          type: string
        description:
          type: string
        location:
          type: string
        startDate:
          type: string
          format: date
        endDate:
          type: string
          format: date

    Business:
      type: object
      properties:
        businessId:
          type: integer
        name:
          type: string
        location:
          type: string

    AQIData:
      type: object
      properties:
        location:
          type: string
        timestamp:
          type: string
          format: date-time
        aqiValue:
          type: integer

    CarbonFootprintInputs:
      type: object
      properties:
        transportationType:
          type: string
        distanceTraveled:
          type: number
        energyUsage:
          type: number
        wasteGenerated:
          type: number

    CarbonFootprintReport:
      type: object
      properties:
        user:
          $ref: "#/components/schemas/User"
        carbonFootprintValue:
          type: number
        recommendations:
          type: array
          items:
            type: string
```
