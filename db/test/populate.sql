-- # populate orgs table
insert into orgs (name, city, state, token) values ('a1', 'McGrawsville', 'IN', 'tok1');
insert into orgs (name, city, state, token) values ('a2', 'Plevna', 'IN', 'tok2');
insert into orgs (name, city, state, token) values ('a3', 'Marion', 'IN', 'tok3');

delete from orgs;

insert into orgs (id, name, city, state, token) values (1, 'Trevecca', 'Nashville', 'TN', 'tok1');
insert into orgs (id, name, city, state, token) values (2, 'All Star', 'Nashville', 'TN', 'tok2');

-- # populate users table
insert into users (org_id, first, last, username, password) values (1, 'bob', 'paul', 'bob1', '1234');
insert into users (org_id, first, last, username, password) values (1, 'bob', 'paul', 'bob2', '1234');
insert into users (org_id, first, last, username, password) values (1, 'bob', 'paul', 'bob3', '1234');

delete from users;

insert into users (id, org_id, first, last, username, password) values (1, 1, 'Bob', 'Paul', 'bob', '$2a$10$3fHOFhv53wb4FBM2zTF4L.XFDSsiDF7pPYOUYsiqV9iAgI3g6mhZG');
insert into users (id, org_id, first, last, username, password) values (2, 2, 'Sue', 'Sara', 'sue', '$2a$10$3fHOFhv53wb4FBM2zTF4L.XFDSsiDF7pPYOUYsiqV9iAgI3g6mhZG');

-- # add admin to org
update orgs set admin_id = 1 where id = 1;
update orgs set admin_id = 1 where id = 2;

-- # populate insurances table
insert into insurances (org_id, name, is_rug) values (1, 'Medicare A', true);
insert into insurances (org_id, name, is_rug) values (1, 'Healthspring', false);

delete from insurances;

insert into insurances (id, org_id, name, is_rug) values (1, 1, 'Medicare A', true);
insert into insurances (id, org_id, name, is_rug) values (2, 1, 'Healthspring', false);

-- # populate precautions table
insert into precautions (org_id, name, description) values (1, 'name', 'description');
insert into precautions (org_id, name, description) values (1, 'name', 'description');
insert into precautions (org_id, name, description) values (1, 'name', 'description');
insert into precautions (org_id, name, description) values (1, 'name', 'description');
insert into precautions (org_id, name, description) values (1, 'name', 'description');
insert into precautions (org_id, name, description) values (1, 'name', 'description');

delete from precautions;

insert into precautions (id, org_id, name, description) values (1, 1, 'DM', 'Diabetes');
insert into precautions (id, org_id, name, description) values (2, 1, 'HIP', 'Hip');
insert into precautions (id, org_id, name, description) values (3, 1, 'VR', 'Valve Replacement');
insert into precautions (id, org_id, name, description) values (4, 1, 'ISO', 'Isolation');
insert into precautions (id, org_id, name, description) values (5, 1, 'CTX', 'Co-Treatment');
insert into precautions (id, org_id, name, description) values (6, 1, 'VNT', 'Ventilator');

-- -- # populate disciplines table
insert into disciplines (org_id, name, abbr) values (1, 'Occupational Therapy', 'OT');
insert into disciplines (org_id, name, abbr) values (1, 'Physical Therapy', 'PT');
insert into disciplines (org_id, name, abbr) values (1, 'Speech Therapy', 'ST');

delete from disciplines;

insert into disciplines (id, org_id, name, abbr) values (1, 1, 'Occupational Therapy', 'OT');
insert into disciplines (id, org_id, name, abbr) values (2, 1, 'Physical Therapy', 'PT');
insert into disciplines (id, org_id, name, abbr) values (3, 1, 'Speech Therapy', 'ST');

-- -- # populate days_in_week table
insert into days_in_week (org_id, full_name, abbr, letter) values (1, 'Monday', 'Mon', 'M');
insert into days_in_week (org_id, full_name, abbr, letter) values (1, 'Tuesday', 'Tue', 'T');
insert into days_in_week (org_id, full_name, abbr, letter) values (1, 'Wednesday', 'Wed', 'W');
insert into days_in_week (org_id, full_name, abbr, letter) values (1, 'Thursday', 'Thu', 'R');
insert into days_in_week (org_id, full_name, abbr, letter) values (1, 'Friday', 'Fri', 'F');
insert into days_in_week (org_id, full_name, abbr, letter) values (1, 'Saturday', 'Sat', 'S');
insert into days_in_week (org_id, full_name, abbr, letter) values (1, 'Sunday', 'Sun', 'U');

delete from days_in_week;

insert into days_in_week (id, org_id, full_name, abbr, letter) values (1, 1, 'Monday', 'Mon', 'M');
insert into days_in_week (id, org_id, full_name, abbr, letter) values (2, 1, 'Tuesday', 'Tue', 'T');
insert into days_in_week (id, org_id, full_name, abbr, letter) values (3, 1, 'Wednesday', 'Wed', 'W');
insert into days_in_week (id, org_id, full_name, abbr, letter) values (4, 1, 'Thursday', 'Thu', 'R');
insert into days_in_week (id, org_id, full_name, abbr, letter) values (5, 1, 'Friday', 'Fri', 'F');
insert into days_in_week (id, org_id, full_name, abbr, letter) values (6, 1, 'Saturday', 'Sat', 'S');
insert into days_in_week (id, org_id, full_name, abbr, letter) values (7, 1, 'Sunday', 'Sun', 'U');

-- # populate therapists table
insert into therapists (org_id, disc_id, first, last, is_therapist, photo, productivity_goal, phone) values (1, 2, 'Jane', 'Doe', true, 'image.png', 80, '615-555-1234');
insert into therapists (org_id, disc_id, first, last, is_therapist, photo, productivity_goal, phone) values (1, 2, 'John', 'Doe', true, 'image.png', 80, '615-555-5678');

delete from therapists;

insert into therapists (id, org_id, disc_id, first, last, is_therapist, photo, productivity_goal, phone) values (1, 1, 3, 'Jane', 'Doe', true, 'image1.png', 78, '615-555-1234');
insert into therapists (id, org_id, disc_id, first, last, is_therapist, photo, productivity_goal, phone) values (2, 1, 2, 'John', 'Doe', false, 'image2.png', 83, '615-555-5678');

-- # populate work_schedules table
insert into work_schedules (therapist_id, org_id, day_id, is_late_eval, start_time, end_time) values (1, 1, 2, true, '8:15 am', '5:15 pm');
insert into work_schedules (therapist_id, org_id, day_id, is_late_eval, start_time, end_time) values (1, 1, 3, false, '7:15 am', '3:15 pm');
insert into work_schedules (therapist_id, org_id, day_id, is_late_eval, start_time, end_time) values (2, 1, 3, true, '9:00 am', '5:30 pm');
insert into work_schedules (therapist_id, org_id, day_id, is_late_eval, start_time, end_time) values (1, 1, 4, true, '8:15 am', '5:15 pm');

delete from work_schedules;

insert into work_schedules (id, therapist_id, org_id, day_id, is_late_eval, start_time, end_time) values (1, 1, 1, 2, true, '8:15 am', '5:15 pm');
insert into work_schedules (id, therapist_id, org_id, day_id, is_late_eval, start_time, end_time) values (2, 1, 1, 3, false, '7:15 am', '3:15 pm');
insert into work_schedules (id, therapist_id, org_id, day_id, is_late_eval, start_time, end_time) values (3, 2, 1, 3, true, '9:00 am', '5:30 pm');
insert into work_schedules (id, therapist_id, org_id, day_id, is_late_eval, start_time, end_time) values (4, 1, 1, 4, true, '8:15 am', '5:15 pm');

-- # populate clients table
insert into clients (org_id, ins_id, first, last, photo, room, admit_date, discharge_date) values (1, 2, 'Sara', 'Claire', 'image.png', '205A', '12/10/14', '1/15/15');
insert into clients (org_id, ins_id, first, last, photo, room, admit_date, discharge_date) values (1, 2, 'Josh', 'Frank', 'image.png', '322B', '12/9/14', '1/08/15');
insert into clients (org_id, ins_id, first, last, photo, room, admit_date, discharge_date) values (1, 1, 'Dari', 'Shure', 'image.png', '200B', '12/1/14', '1/25/15');
insert into clients (org_id, ins_id, first, last, photo, room, admit_date, discharge_date) values (1, 2, 'Fred', 'Frank', 'image.png', '515A', '11/18/14', '12/31/14');

delete from clients;

insert into clients (id, org_id, ins_id, first, last, photo, room, admit_date, discharge_date) values (1, 1, 2, 'Sara', 'Claire', 'image3.png', '205A', '12/10/14', '1/15/15');
insert into clients (id, org_id, ins_id, first, last, photo, room, admit_date, discharge_date) values (2, 1, 2, 'Josh', 'Frank', 'image4.png', '322B', '12/9/14', '1/08/15');
insert into clients (id, org_id, ins_id, first, last, photo, room, admit_date, discharge_date) values (3, 2, 1, 'Dari', 'Shure', 'image5.png', '200B', '12/1/14', '1/25/15');
insert into clients (id, org_id, ins_id, first, last, photo, room, admit_date, discharge_date) values (4, 1, 2, 'Fred', 'Frank', 'image6.png', '515A', '11/18/14', '12/31/14');

-- # populate treatment_plans table
insert into treatment_plans (org_id, clients_id, eval_therapist_id, disc_id, eval_date, discharge_date, recert_date, weekly_day_id, frequency_low, frequency_high) values (1, 1, 1, 3, '12/11/14', '1/14/15', '11/11/14', 4, 5, 7);
insert into treatment_plans (org_id, clients_id, eval_therapist_id, disc_id, eval_date, discharge_date, recert_date, weekly_day_id, frequency_low, frequency_high) values (1, 1, 1, 3, '12/10/14', '1/13/15', '11/10/14', 2, 5, 7);
insert into treatment_plans (org_id, clients_id, eval_therapist_id, disc_id, eval_date, discharge_date, recert_date, weekly_day_id, frequency_low, frequency_high) values (1, 1, 1, 3, '12/12/14', '1/15/15', '11/12/14', 5, 5, 7);

delete from treatment_plans;

insert into treatment_plans (id, org_id, clients_id, eval_therapist_id, disc_id, eval_date, discharge_date, recert_date, weekly_day_id, frequency_low, frequency_high) values (1, 1, 1, 1, 3, '12/11/14', '1/14/15', '11/11/14', 4, 5, 7);
insert into treatment_plans (id, org_id, clients_id, eval_therapist_id, disc_id, eval_date, discharge_date, recert_date, weekly_day_id, frequency_low, frequency_high) values (2, 1, 3, 1, 3, '12/10/14', '1/13/15', '11/10/14', 2, 5, 7);
insert into treatment_plans (id, org_id, clients_id, eval_therapist_id, disc_id, eval_date, discharge_date, recert_date, weekly_day_id, frequency_low, frequency_high) values (3, 1, 2, 1, 3, '12/12/14', '1/15/15', '11/12/14', 5, 5, 7);

-- # populate clients_precautions table
insert into clients_precautions (client_id, precaution_id) values (1, 2);
insert into clients_precautions (client_id, precaution_id) values (1, 3);
insert into clients_precautions (client_id, precaution_id) values (1, 6);
insert into clients_precautions (client_id, precaution_id) values (2, 2);
insert into clients_precautions (client_id, precaution_id) values (2, 4);

-- # populate treatments table
insert into treatments (client_id, therapist_id, org_id, disc_id, ins_id, mins_expected, mins_actual, date, day_count, is_note_done, is_archived) values (1, 2, 1, 2, 1, 45, 0, '12/24/14', 25, true, true);
insert into treatments (client_id, therapist_id, org_id, disc_id, ins_id, mins_expected, mins_actual, date, day_count, is_note_done, is_archived) values (2, 2, 1, 2, 2, 45, 0, '12/24/14', 25, false, false);
insert into treatments (client_id, therapist_id, org_id, disc_id, ins_id, mins_expected, mins_actual, date, day_count, is_note_done, is_archived) values (1, 2, 1, 2, 1, 45, 0, '12/25/14', 26, true, false);
insert into treatments (client_id, therapist_id, org_id, disc_id, ins_id, mins_expected, mins_actual, date, day_count, is_note_done, is_archived) values (1, 2, 1, 2, 1, 45, 0, '12/26/14', 27, false, false);
insert into treatments (client_id, therapist_id, org_id, disc_id, ins_id, mins_expected, mins_actual, date, day_count, is_note_done, is_archived) values (1, 2, 1, 2, 1, 45, 0, '12/27/14', 28, false, false);

delete from treatments;

insert into treatments (id, client_id, therapist_id, org_id, disc_id, ins_id, mins_expected, mins_actual, date, day_count, is_note_done, is_archived) values (1, 1, 2, 1, 2, 1, 45, 0, '12/24/14', 25, true, true);
insert into treatments (id, client_id, therapist_id, org_id, disc_id, ins_id, mins_expected, mins_actual, date, day_count, is_note_done, is_archived) values (2, 2, 2, 1, 2, 2, 45, 0, '12/24/14', 25, false, false);
insert into treatments (id, client_id, therapist_id, org_id, disc_id, ins_id, mins_expected, mins_actual, date, day_count, is_note_done, is_archived) values (3, 1, 2, 1, 2, 1, 45, 0, '12/25/14', 26, true, false);
insert into treatments (id, client_id, therapist_id, org_id, disc_id, ins_id, mins_expected, mins_actual, date, day_count, is_note_done, is_archived) values (4, 1, 2, 1, 2, 1, 45, 0, '12/26/14', 27, false, false);
insert into treatments (id, client_id, therapist_id, org_id, disc_id, ins_id, mins_expected, mins_actual, date, day_count, is_note_done, is_archived) values (5, 1, 2, 1, 2, 1, 45, 0, '12/27/14', 28, false, false);
