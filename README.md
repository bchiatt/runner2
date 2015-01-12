# RUG Runner 2.0
============================
### Code Badges
##### Travis
[![Build Status](https://travis-ci.org/bchiatt/runner2.svg?branch=dev)](https://travis-ci.org/bchiatt/runner2)
##### Coveralls
[![Coverage Status](https://coveralls.io/repos/bchiatt/runner2/badge.png?branch=dev)](https://coveralls.io/r/bchiatt/runner2?branch=dev)
##### SauceLabs
[![Sauce Test Status](https://saucelabs.com/browser-matrix/bchiatt-runner2.svg)](https://saucelabs.com/u/bchiatt-runner2)

### Screenshots
![Image1](/docs/screenshots/register.png)
![Image2](/docs/screenshots/sidebar.png)
![Image3](/docs/screenshots/edit.png)
![Image4](/docs/screenshots/schema.png)

### Description
RUG Runner is an admission to discharge management web application for physical
(as well as occupational, speech, respiratory, etc.) therapy departments.
The purpose of RUG Runner is to make it easier for rehab managers/schedulers to do
the hard work of projecting, tracking and evaluating treatment minutes or, as
Medicare calls them, resource utilization groups (RUG).

### Route Documentation
```
http://base-url/docs
```

### Database & Models
```
Organizations
```

```
Users
```

```
Insurances
```

```
Precautions
```

```
Disciplines
```

```
Days
```

```
Therapists
```

```
Work_Schedules
```

```
Clients
```

```
Treatments_Plans
```

```
Treatments
```

### Features
- [x] Register Organization and Administrator (user)
- [x] Login Administrator
- [x] Create Insurance
- [x] Create Precautions
- [x] Create Disciplines
- [x] Create Days
- [x] Create Therapists
- [x] Create Work Schedules
- [x] Create Clients
- [x] Create Treatment Plans
- [x] Create Treatments
- [x] Update Insurance
- [x] Update Precautions
- [x] Update Disciplines
- [x] Update Days
- [x] Update Therapists
- [x] Update Work Schedules
- [x] Update Clients
- [x] Update Treatment Plans
- [x] Update Treatments
- [ ] Register Non-Admin Users
- [ ] Admit Client Flow
- [ ] Display Client RUG Calculator
- [ ] Schedule Treatements Flow
- [ ] Confirm/Archive Treatments Flow

### Running Tests
```bash
$ npm install
$ npm test
$ make test-e2e
```

### Setting Up Database for Testing
create postgres db named `runner_test` (or name of choice)
```bash
$ cd test/scripts
# run all three scripts in this order if any changes made to db structure
$ ./drop-tables.sh runner_test # can skip if db is new; drops all tables
$ ./create-db.sh runner_test # creates all tables in the db
$ ./clean-db.sh runner_test # deletes * from each table and enters seed data
```
```bash
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
