# FS-App-Backend

This app allows a user to upload any file to DB and then the user will get a download link using which anyone can download that file.

# Tech Stack

1. NodeJS
2. MongoDB
3. ExpressJS
4. Multer

# Hosting

The project is hosted on render.com at https://fs-app-pko.onrender.com

# Routes

1. https://fs-app-pko.onrender.com/api/v1/files : for 'POST' request to upload a file

![uploading-file.png](uploading-file.png)

2. https://fs-app-pko.onrender.com/api/v1/files/:fileId: to download a file with fileId=fileId

# How to use:

1. Simply create a clone of the project on your local machine.

2. Then you will need to change the necessary env variables as well as setup MongoDB.

3. Then build the project using 'npm run install' to download dependencies in package.json

4. Use 'npm run start'
