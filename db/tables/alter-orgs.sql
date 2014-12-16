alter table orgs add foreign key ("admin_id") references users(id) on delete cascade;
