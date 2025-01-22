# InstaJunior

InstaJunior is a React application built with TypeScript and Vite. It allows users to register, log in, and view a gallery of images. Users can like images, add comments, and reply to comments.

## Features

- User authentication with Firebase
- Image gallery with like functionality
- Comment and reply system
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (>= 18.0)
- Firebase account

### Installation

1. Clone the repository:

git clone https://github.com/your-username/insta-junior.git
cd insta-junior

2. Install dependencies:

npm install

3. Configure Firebase:

Update the Firebase configuration in firebaseConfig.ts with your Firebase project details.

Running the Project
To start the development server, run:

npm run dev

### Usage

Authentication
Users can register and log in using their email and password or their Google account. The authentication is handled by Firebase.

Image Gallery
The image gallery displays a list of images fetched from an external source. Users can like images, add comments, and reply to comments.

### Components
Login: Handles user login.
Register: Handles user registration.
ImageGallery: Displays the image gallery.
ImageCard: Displays individual images with like and comment functionality.
Loader: Displays a loading message while images are being fetched.

### Preview/Demo Link

Link - https://insta-junior.vercel.app/ 