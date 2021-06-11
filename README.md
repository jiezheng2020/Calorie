# <img src="react-app/public/favicon.ico" width="25" height="25"> Welcome to Calorie!

### **Live Link: [Calorie](https://calorie-aa.herokuapp.com/)**

**Calorie** is a calorie counting application personalized to the user's specifications. The site allows users to create diary entries for each day and log their food and exercises, making calorie tracking easier than ever.

Check out the [wiki](https://github.com/jiezheng2020/Calorie/wiki) for more information!

## Technologies

#### Front-End

- React
- Redux
- CSS

#### Back-End

- Python
- PostgreSQL
- Flask
- SQLAlchemy

## Features

- Sign up a new account and log in
- Create / Edit / Search Diary entries
- Search / Create / Edit / Delete Food and Exercise entries
- Receive a personalized daily caloric goal based on your specifications, or set a custom goal!


## Instructions

To run this application:

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/danielshoun/harmony.git
   ```

2. Install dependencies

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the **.env.example** file
4. Setup a PostgreSQL user, password and database that matches the **.env** file

5. Enter the python virtual environment, migrate the database, seed the database, and run the flask app

   ```bash
   pipenv shell
   ```
   ```bash
   flask db upgrade
   ```
   ```bash
   flask seed all
   ```
   ```bash
   flask run
   ```

6. Install front end dependencies from the `react-app` directory and then run the front end server
   ```bash
   npm install && npm run
   ```
   
## Future To Do Items

- [ ] Generating Reports of user progression
