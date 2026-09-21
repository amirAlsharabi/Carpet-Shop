# CarpetCraft

## Overview

CarpetCraft is a web application for selling ready-made rugs and custom-cut carpets by the meter.
Customers can browse carpets, input custom room dimensions, get instant price calculations, and request extra services like border edging and home installation.
Admins can manage the carpet catalog and track customer orders through different workshop stages.

## Screenshots

Screenshots of the application will be added after the project is completed.

## Technologies Used

Node.js
Express.js
MongoDB
Mongoose
EJS
JavaScript
HTML
CSS
Git & GitHub

## Getting Started

Clone the repository.
Install the required dependencies using npm install.
Create a .env file.
Add the PORT, MongoDB connection string, and session secret.
Run the application locally using npm start or nodemon.

## User Stories

### Authentication & Roles

As a user, I want to create an account so that I can purchase and track orders.
As a user, I want to log in so that I can access my account.
As a user, I want to log out so that my account remains secure.

### Carpets (Catalog)

As a customer, I want to view all available carpets so that I can find a carpet I like.
As a customer, I want to view the details of a carpet (origin, thickness in mm, material, and price).
As a customer, I want to enter custom measurements (length and width) and see the total area and price calculated automatically.
As an admin, I want to add new carpets to the catalog so that customers can see them.
As an admin, I want to edit carpet information and prices.
As an admin, I want to delete a carpet listing that is no longer sold.

### Orders & Services

As a customer, I want to place an order for either a ready-made rug or a custom-cut carpet.
As a customer, I want to select optional services like border edging and installation with my order.
As a customer, I want to view my order history and see the current status of my order.
As an admin, I want to view all incoming orders on a dashboard.
As an admin, I want to update the status of an order (Pending, Cutting/Preparing, Out for Installation, Completed).
As a customer, I want to cancel my order as long as it is still pending.

## Database Design

The application uses three main models:

### User

username
password
role (customer or admin)

### Carpet

name
type (custom_meter or ready_made)
origin
thickness
material
price
fixedDimensions (length, width)
imageUrl
stockQuantity
isAvailable

### Order

customer
carpet
orderType
dimensions (length, width, totalArea)
installationNeeded
edgingNeeded
totalPrice
deliveryAddress
status

### Relationships

A User can have many Orders.
A Carpet can have many Orders.
Each Order belongs to one User.
Each Order belongs to one Carpet.

## Routes

| Method | Route | Description |
|---|---|---|
| GET | / | Home page |
| GET | /auth/sign-up | Sign up form |
| POST | /auth/sign-up | Register new user |
| GET | /auth/sign-in | Sign in form |
| POST | /auth/sign-in | Log in user |
| GET | /auth/sign-out | Log out user |
| GET | /carpets | List all carpets |
| GET | /carpets/new | New carpet form (Admin only) |
| POST | /carpets | Create carpet (Admin only) |
| GET | /carpets/:id | View carpet details and price calculator |
| GET | /carpets/:id/edit | Edit carpet form (Admin only) |
| PUT | /carpets/:id | Update carpet (Admin only) |
| DELETE | /carpets/:id | Delete carpet (Admin only) |
| GET | /orders | View user's orders (or all orders for Admin) |
| POST | /orders | Place a new order |
| GET | /orders/:id | View specific order details |
| PUT | /orders/:id/status | Update order status (Admin only) |
| DELETE | /orders/:id | Cancel order |

## Features

User authentication and session handling
Role-based authorization (Customer vs Admin)
Full CRUD functionality on carpets (Admin only)
Dynamic square meter and total price calculation
Add-on services selection (border edging and installation)
Order status management workflow
Order history tracking for customers
Responsive interface built with EJS and CSS

## Future Enhancements

Export invoices and work orders into PDF
Add interactive map for delivery location selection
Image upload support using Cloudinary
Email notifications for order status changes using Nodemailer
Search and filter carpets by material, origin, and thickness

## Credits

Developed by Amir Mohammed