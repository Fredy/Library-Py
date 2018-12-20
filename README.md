
# Library-Py

### How to install

#### Pre
To install and run this project you need:
* `Python 3.6+`
* `npm`

1. Clone this repo `git clone https://github.com/Fredy/Library-Py.git` and `cd` to the repo directory.
2. If you have pipenv:
   ```
   pipenv install
   ```
   Otherwise: create a *virtualenv* and install the requierements in `requirements.txt`:
   ```
   pip install -r requierements.txt
   ```
3. Install the `npm` requierements: `npm install` 
4. Activate the project virtualenv. 
5. Create an temporal enviroment variable:
   ```
   export DJANGO_KEY='%@r_g2yvvbdemk&%&6f-k=w^e7f5-)tryvrraj6)5s8%4sc*#v' // A random string of size 50
   ```
6. Run:
  ```
  python manage.py makemigrations books
  python manage.py migrate
  python datagen.py
  python manage.py loaddata books
  ```
7. Run the servers:  
   In one terminal: `python manage.py runserver`   
   In another terminal: `npm run dev`

### How to use 

* `http://127.0.0.1:8000/` is the *user view*, there you can search books by title, author and date.
* If you want to use the *admin* view, first you must create an account running: 
  ```
  python manage.py createsuperuser --email admin@example.com --username admin
  ```
  * Then go to `http://127.0.0.1:8000/admin` to log into the admin account.
  * To create, edit and remove books, goto `http://127.0.0.1:8000/admin_page`
  * **Note:** you can only modify the database if you are loged as the admin.
  * In the current version you cannot log out, please delete the site cookies to logout.
