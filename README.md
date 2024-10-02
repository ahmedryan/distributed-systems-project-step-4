# Microservice Node.js Simulation

This project is a microservice Node.js simulation that uses Docker to compose multiple services. The services include MongoDB, Nginx servers, and various Node.js services for ride-sharing and communication. The project is designed to simulate a distributed system with services running in different locations.

## Usage

Once the services are up and running, you can access them via the specified ports. For example, the communication services are accessible on port 8080.

## Services

- **database-mongodb**: MongoDB database service.
- **server-nginx-dhaka**: Nginx server for Dhaka, depends on ride-sharing and rating services.
- **server-nginx-ctg**: Nginx server for Chittagong, depends on ride-sharing and rating services.
- **service-rating**: Service for handling ratings, depends on MongoDB.
- **service-communication-dhaka**: Communication service for Dhaka, accessible on port 8080.
- **service-communication-ctg**: Communication service for Chittagong, accessible on port 8080.
- **service-ride-sharing-dhaka**: Ride-sharing service for Dhaka, depends on the communication service.
- **service-ride-sharing-ctg**: Ride-sharing service for Chittagong, depends on the communication service.

## Networks

The services are connected through a custom Docker network named `network-distributed-systems-project` with a subnet of `10.100.0.0/24`.

## Volumes

- **data**: Persistent storage for MongoDB data.
