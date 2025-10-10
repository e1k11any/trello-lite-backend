Trello-Lite API Documentation Welcome to the official API documentation for the Trello-Lite collaboration platform.

Base URL: http://localhost:5000 (or your deployed URL)

Authentication All protected endpoints require a Bearer Token for authentication. After a successful registration or login, you will receive a JSON Web Token (JWT). This token must be included in the Authorization header of your requests.

Header Format: Authorization: Bearer <YOUR_JWT_TOKEN>

Users & Authentication Endpoints for user registration and login.

POST /api/users/register Registers a new user account.

Access: Public

Request Body:

JSON

{ "name": "Ibrahim Yasser", "email": "ibrahim@example.com", "password": "yourpassword123" } Success Response: 201 Created

JSON

{ "_id": "64c9c1b1c2b5f8a3d4e5f6g7", "name": "Ibrahim Yasser", "email": "ibrahim@example.com", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } Error Response: 400 Bad Request if email is already in use.

POST /api/users/login Authenticates a user and returns a JWT.

Access: Public

Request Body:

JSON

{ "email": "ibrahim@example.com", "password": "yourpassword123" } Success Response: 200 OK

JSON

{ "_id": "64c9c1b1c2b5f8a3d4e5f6g7", "name": "Ibrahim Yasser", "email": "ibrahim@example.com", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." } Error Response: 401 Unauthorized for invalid credentials.

Boards Endpoints for managing project boards.

GET /api/boards Retrieves all boards the authenticated user is a member of.

Access: Private (Authentication required)

Success Response: 200 OK

JSON

[ { "_id": "boardId1", "owner": "userId1", "name": "Project Phoenix", "members": [...] } ] POST /api/boards Creates a new board. The creator is automatically set as the owner and an admin.

Access: Private (Authentication required)

Request Body:

JSON

{ "name": "New Project Board", "description": "This is the description for our new board." } Success Response: 201 Created with the new board object.

GET /api/boards/:id Retrieves a single board by its ID.

Access: Private (Board members only)

URL Params: id=[board ID]

Success Response: 200 OK with the board object.

Error Responses: 403 Forbidden if not a member, 404 Not Found if board does not exist.

PUT /api/boards/:id Updates a board's details.

Access: Private (Board admins only)

URL Params: id=[board ID]

Request Body: (Provide only the fields you want to update)

JSON

{ "name": "Updated Board Name" } Success Response: 200 OK with the updated board object.

Error Response: 403 Forbidden if user is not an admin.

DELETE /api/boards/:id Deletes a board.

Access: Private (Board owner only)

URL Params: id=[board ID]

Success Response: 200 OK

JSON

{ "message": "Board deleted successfully" } Error Response: 403 Forbidden if user is not the owner.

Board Members POST /api/boards/:id/members Adds a new member to a board.

Access: Private (Board admins only)

URL Params: id=[board ID]

Request Body:

JSON

{ "email": "newmember@example.com" } Success Response: 200 OK with the updated list of members.

Error Responses: 400 Bad Request if user is already a member, 403 Forbidden if not an admin, 404 Not Found if user email does not exist.

Lists Endpoints for managing lists within a board.

GET /api/boards/:boardId/lists Retrieves all lists belonging to a specific board.

Access: Private (Board members only)

URL Params: boardId=[board ID]

Success Response: 200 OK with an array of list objects.

POST /api/boards/:boardId/lists Creates a new list on a board.

Access: Private (Board members only)

URL Params: boardId=[board ID]

Request Body:

JSON

{ "name": "To Do" } Success Response: 201 Created with the new list object.

Cards Endpoints for managing cards within a list. Full CRUD for lists and cards follows the same pattern as boards.

POST /api/boards/:boardId/lists/:listId/cards Creates a new card in a list.

Access: Private (Board members only)

URL Params: boardId, listId

Request Body:

JSON

{ "name": "Design the login page", "description": "Use Figma mockups for reference." } Success Response: 201 Created with the new card object.

PUT /api/boards/:boardId/lists/:listId/cards/:cardId Updates a card. Can be used to change the name, description, or to move the card to a new list by providing a new list ID in the body.

Access: Private (Board members only)

URL Params: boardId, listId, cardId

Request Body:

JSON

{ "name": "Implement the login API", "list": "newListId" } Success Response: 200 OK with the updated card object.

Activities GET /api/boards/:id/activities Retrieves the activity log for a specific board.

Access: Private (Board members only)

URL Params: id=[board ID]

Success Response: 200 OK

JSON

[ { "_id": "activityId1", "text": "added 'Implement the login API' to this board", "user": { "_id": "userId1", "name": "Ibrahim Yasser" }, "board": "boardId1", "createdAt": "2025-09-24T12:00:00.000Z" } ]
