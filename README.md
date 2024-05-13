# ESN Project Frontend Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To start the frontend application:

### `npm start`


Open [http://localhost:3000](http://localhost:3000) to view it in the browser.






## Setting Up Local HTTPS
To set up HTTPS locally, generate your own SSL certificates:

1. Install `mkcert` on your machine:
    - Windows: `choco install mkcert`
    - macOS: `brew install mkcert`
    - Linux: Follow the instructions on the mkcert GitHub page.

2. Navigate to the project root and run:
   ```bash
   mkcert -install
   mkcert localhost
