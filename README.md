## name of project
### Code Badges
[![Build Status](https://travis-ci.org/bchiatt/runner2.svg?branch=dev)](https://travis-ci.org/bchiatt/runner2)
[![Coverage Status](https://coveralls.io/repos/bchiatt/runner2/badge.png?branch=dev)](https://coveralls.io/r/bchiatt/runner2?branch=dev)

### Screenshots
![Image1](/docs/screenshots/one.jpg)
![Image2](/docs/screenshots/two.jpg)

### Description
write a description about your project

### Models
```
Model 1
```

```
Model 2
```

### Database
```
Collecion 1
```

```
Collection 2
```

### Features
- [x] Feature 1
- [ ] Feature 2
- [x] Feature 3

### Running Tests
```bash
$ npm install
$ npm test
```

### Setting Up Database for Testing
create postgres db named `runner_test` (or name of choice)
```bash
$ cd test/scripts
# run all three scripts in this order if any changes made to db structure
$ ./drop-tables.sh runner_test # can skip if db is new; drops all tables
$ ./create-db.sh runner_test # creates all tables in the db
$ ./clean-db.sh runner_test # deletes * from each table and enters seed data
$ ./reset-db.sh runner_test # executes the above 3 scripts
```

### Setting Up Database for Production
create postgres db name `runner` (or name of choice)
```bash
$ cd test/scripts
$ ./drop-tables.sh runner_test # can skip if db is new; drops all tables
$ ./create-db.sh runner_test # creates all tables in the db
```

### Process Environment Variables Required
```bash
$ PORT
$ DATABASE_URL
$ AWS_BUCKET
$ AWS_SECRET_ACCESS_KEY
$ AWS_ACCESS_KEY_ID
```

### Contributors
- [Brian Hiatt](https://github.com/bchiatt)

### License
[MIT](LICENSE)
