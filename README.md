# Magic Transporters

## Introduction

Welcome to Magic Transporters, the future of moving things easily. These super cool transporters, powered by virtual magic, are here to make shipping stuff a breeze. In the world of Magic Transporters, there are special people known as Magic Movers. They use nifty gadgets to move important things. Fueled by virtual magic, these Movers go on quick missions to carry items around.

## Overview

A Magic Mover has:
- Weight limit (the most they can carry)
- Energy (their total magic power)
- Quest state (what they’re currently doing: resting, loading, on a mission, or done)

Each Magic Item they carry has:
- Name (what it’s called)
- Weight (how much magic power it needs)

## API Endpoints

### Authentication
- Login to System as magic mover and admin
- Logout
- Refresh token

### Admin / Magic Mover 
- Add new magic mover
- Update magic mover
- Delete magic mover

### Admin / Users
- Add new user
- Update user
- Delete user
- Fetch all
- Fetch all Mover for user

### Magic Mover
- Create trip
- Update trip
- Delete trip
- Fetch all my trips with magic items
- Add magic item to trip
- Delete magic item
- Change state of any trip it is not completed yet
- get all my magic mover 

## Installation

1. Clone the repository.
2. Run `npm i` to install dependencies.

## Running the Project

To run the project, use one of the following commands:

- For development: `npm run start:dev`
- For production: `npm run start:prod`

## Database Setup

Before starting the project, execute the `magicr_tansporters.sql` file to generate the database.

## Contributing

Contributions are welcome. Please follow the project's contribution guidelines.

## License

This project is licensed under Raed Al Masri 
