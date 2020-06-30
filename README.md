# Google Books Search

![Google Books Search Screenshot](./screen.png?raw=true "google books search")

### Overview

This Google Books Search app was built using React components and React lifecycle methods to query and display books based on user searches. It also uses Node, Express and MongoDB so that users can save books to review or purchase later.

* This application consists of 2 pages:

  * [Search] - User can search for books via the Google Books API and render them here. User has the option to "View" a book, bringing them to the book on Google Books, or "Save" a book, saving it to the Mongo database.

  * [Saved] - Renders all books saved to the Mongo database. User has an option to "View" the book, bringing them to the book on Google Books, or "Delete" a book, removing it from the Mongo database.

Book results have each of the following fields:

* `title` - Title of the book from the Google Books API

* `authors` - The book's author(s) as returned from the Google Books API

* `description` - The book's description as returned from the Google Books API

* `image` - The book's thumbnail image as returned from the Google Books API

* `link` - The book's information link as returned from the Google Books API

The application uses a SPA (Single Page Application) layout that uses [`react-router-dom`](https://github.com/reactjs/react-router) to navigate, hide, and show the React components without changing the route within Express. It also includes the following Express routes:

* `/api/books` (get) - Returns all saved books as JSON.

* `/api/books` (post) - Saves a new book to the database.

* `/api/books/:id` (delete) - Deletes a book from the database by Mongo `_id`.

* `*` (get) - Loads a single HTML page in `client/build/index.html`. 

* Check out the application to Heroku: https://vast-ridge-81306.herokuapp.com/ 

- - -