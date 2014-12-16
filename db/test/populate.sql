# populate orgs table
insert into orgs (name, city, state) values ('a1', 'McGrawsville', 'IN');
insert into orgs (name, city, state) values ('a2', 'Plevna', 'IN');
insert into orgs (name, city, state) values ('a3', 'Marion', 'IN');

delete from orgs;

insert into orgs (id, name, city, state) values (1, 'Trevecca', 'Nashville', 'TN');

# populate users table
insert into users (org_id, first, last, username, password) values (1, 'bob', 'paul', 'bob1', '1234');
insert into users (org_id, first, last, username, password) values (1, 'bob', 'paul', 'bob2', '1234');
insert into users (org_id, first, last, username, password) values (1, 'bob', 'paul', 'bob3', '1234');

delete from users;

insert into users (id, org_id, first, last, username, password) values (1, 1, 'Bob', 'Paul', 'bob', '$2a$10$3fHOFhv53wb4FBM2zTF4L.XFDSsiDF7pPYOUYsiqV9iAgI3g6mhZG');

# add admin to org
update orgs set admin_id = 1 where id = 1;
