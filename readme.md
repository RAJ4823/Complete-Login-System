# MERN Stack Login System
Welcome to the MERN Stack Login System! This personal project is designed as a learning exercise to explore and implement a secure user authentication and management system using the MERN (MongoDB, Express.js, React, Node.js) stack. Whether you are new to web development or seeking to understand the intricacies of building a login system, this project serves as an educational resource and practical example.

## Features

**1. User Registration** - Users can easily create accounts by providing their credentials.

**2. User Login** - Secure user authentication, ensuring only authorized users can access your application.

**3. Profile Management** - Users can update their profiles, including details like username, email, and profile picture.

**4. Password Recovery** - Forgot your password? No problem! Users can recover their account using email-based OTP verification.

**5. Password Reset** - Reset your password hassle-free with a secure, user-friendly process.

**6. Email Notifications** - Receive email notifications for account-related activities, such as registration and password reset requests.'

**7. OTP Verification** - Enhance account security with OTP (One-Time Password) verification via email.

**8. User Data Storage** - User data, including profiles and authentication information, is safely stored in a MongoDB database.
Getting Started

## Technologies Used
- **MongoDB**: For data storage and management.
- **Express.js**: To create the server and APIs.
- **React**: For building the user interface.
- **Node.js**: For server-side development.
- **Other Libraries**: Including Axios, JWT, Formik, and more.


## Client Package Dependencies

#### 1. axios
- Purpose: Axios is a popular library for making HTTP requests from the browser. It simplifies sending and handling HTTP requests.
- Usage: You can use Axios to interact with APIs, fetching data from servers, and handling API requests in your React application.

#### 2. dotenv
- Purpose: dotenv is used for managing environment variables in your React application. It's handy for storing sensitive information like API keys and configuration variables.
- Usage: Store configuration details and secrets in a .env file and load them using dotenv.

#### 3. formik
- Purpose: Formik is a library for handling forms in React. It simplifies form validation, submission, and form state management.
- Usage: Use Formik to create and manage forms, including validation and submission logic.

#### 4. jwt-decode
- Purpose: jwt-decode is a library for decoding JSON Web Tokens (JWT). It allows you to extract information from JWTs on the client side.
- Usage: Decode JWTs to access information stored within them, such as user data or permissions.

#### 5. react
- Purpose: React is a popular JavaScript library for building user interfaces. It's the core library for your client-side application.
- Usage: You build your entire user interface using React components and libraries.

#### 6. react-dom
- Purpose: React DOM is the React library specifically for rendering React components into the DOM (Document Object Model).
- Usage: It's used to render React components to the browser window.

#### 7. react-hot-toast
- Purpose: React Hot Toast is a library for displaying notifications in your React application.
- Usage: Use it to show user-friendly toast notifications for various events in your app.

#### 8. react-router-dom
- Purpose: React Router DOM is a library for routing in React applications. It helps manage different views and URLs.
- Usage: Create a multi-page React application with navigation and routing using React Router DOM.

#### 9. zustand
- Purpose: Zustand is a lightweight state management library for React. It simplifies managing and sharing state between components.
- Usage: Use Zustand to manage application state and share data between React components.
 
## Server Package Dependencies

#### 1. bcrypt
- Purpose: Securely hash user passwords for enhanced security.
- Usage: Hash and verify user passwords.

#### 2. cors
- Purpose: Implement CORS (Cross-Origin Resource Sharing) for controlling domain access to server resources.
- Usage: Configure CORS for secure API access.

#### 3. dotenv
- Purpose: Manage environment variables in your application, ideal for storing sensitive information.
- Usage: Store configuration details like API keys and database connection strings.

#### 4. express
- Purpose: Web application framework for building APIs and web servers in Node.js, simplifying route handling and middleware management.
- Usage: Create API routes and handle HTTP requests with Express.

#### 5. jsonwebtoken
- Purpose: Generate and verify JSON Web Tokens (JWT) for authentication and authorization.
- Usage: Authenticate and authorize users.

#### 6. mailgen
- Purpose: Generate HTML email templates for well-formatted email content.
- Usage: Create HTML email templates for notifications like account verification or password resets.

#### 7. mongodb-memory-server
- Purpose: In-memory MongoDB database for testing and development.
- Usage: Ideal for writing unit tests and development without affecting the production database.

#### 8. mongoose
- Purpose: Object Data Modeling (ODM) library for MongoDB, simplifying interactions with MongoDB databases.
- Usage: Define data models, schema, and perform CRUD operations using Mongoose.

#### 9. morgan
- Purpose: HTTP request logger middleware for Express, useful for debugging and monitoring.
- Usage: Log incoming requests, including method, status, and response time.

#### 10. multer
- Purpose: Handle file uploads in Express applications, often used for processing file uploads in forms.
- Usage: Handle file uploads, validate files, and save them on the server.

#### 11. nodemailer
- Purpose: Send emails using Node.js, typically for email notifications and messages.
- Usage: Send emails, such as registration confirmation or password reset emails.

#### 12. nodemon
- Purpose: Automatically restart your server during development when code changes are detected.
- Usage: Enhance the development process by auto-reloading the server.

#### 13. otp-generator
- Purpose: Generate one-time passwords (OTPs), often used for two-factor authentication (2FA).
- Usage: Generate OTPs for secure user authentication.

## Author
###### Raj Patel ([RAJ4823](https://github.com/RAJ4823 "RAJ4823"))

## Acknowledgments

A big thanks to the video creator and the original project author for their valuable contributions to this project.

This project was developed with guidance and valuable insights obtained from the following YouTube video:
- [MERN Stack Login System Tutorial](https://www.youtube.com/watch?v=BfrJxGQEPSc) by [Akshay Kashyap](https://github.com/akashyap2013)

The original project repository can be found here:
- [GitHub Repository](https://github.com/akashyap2013/MERN_Login_App_with_ResetEmail)


---

