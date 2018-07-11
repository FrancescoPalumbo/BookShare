# BookShare
BookShare was born in order to fill some gaps in the world of research and sharing of books of various kinds.It is created for:
 - Searching your books: stay up to date on the latest releases of new books. Search and save everything you're interested in;
 - Sharing your searches: share, with your friends, your research in order to receive advice on the desired product.

Project presentation of BookShare: https://docs.google.com/presentation/d/1z_D6_MTjunrJEGtrH6UkHRWRE4WD22TIhGkxoJ9H3Q8/edit?usp=sharing
# Installation
Tested on Ubuntu 18.04

Make sure you are running MongoDB on the default port (27018)

**Clone the repository and create the virtual environment for Python:**
```
$ git clone https://github.com/FrancescoPalumbo/BookShare.git
$ cd BookShare
$ python3 -m venv venv
```
**Activate the environment:**
```
$ . venv/bin/activate
```
**Install the required dependecy:**
```
$ pip install -r requirements.txt

```
**Run the Server:**
```
$ cd flaskr
$ flask run
```
