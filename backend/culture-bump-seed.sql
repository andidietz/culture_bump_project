-- TRUNCATE users, categories, subcategories, tags, reference_points,
--     header_situations, bookmarks CASCADE;

-- TRUNCATE header_specifications CASCADE;

INSERT INTO users (
    username,
    name,
    password,
    email
) VALUES 
    ('AlgerianStudents', 'Algerian Students',
        '$2b$12$snv.uDpJE.P846unImxP7uUBoUwScu6sLYE3eCPoIv1gexmRMjrIS',
        'Algerian-test@gmail.com'),
    ('SaudiArabianStudents', 'Saudi Arabian Students',
        '$2b$12$snv.uDpJE.P846unImxP7uUBoUwScu6sLYE3eCPoIv1gexmRMjrIS',
        'SaudiArabian-test@gmail.com'), 
    ('ItalianStudents', 'Italian Students',
        '$2b$12$snv.uDpJE.P846unImxP7uUBoUwScu6sLYE3eCPoIv1gexmRMjrIS',
        'Italian-test@gmail.com'),  
    ('MexicanStudents', 'Mexican Students',
        '$2b$12$snv.uDpJE.P846unImxP7uUBoUwScu6sLYE3eCPoIv1gexmRMjrIS',
        'Mexican-test@gmail.com'),
    ('BrazilianStudents', 'Brazilian Students',
        '$2b$12$snv.uDpJE.P846unImxP7uUBoUwScu6sLYE3eCPoIv1gexmRMjrIS',
        'Brazilian-test@gmail.com'),   
    ('AmericanStudents', 'American Students',
        '$2b$12$snv.uDpJE.P846unImxP7uUBoUwScu6sLYE3eCPoIv1gexmRMjrIS',
        'American-test@gmail.com');

INSERT INTO categories (category)
VALUES ('in school'),
        ('in Grocery Store');

INSERT INTO subcategories (
    subcategory
) VALUES 
    ('interacting with the teacher'),
    ('interacting with adminstration'),
    ('interacting with other students'),
    ('classroom etiquette');

INSERT INTO tags (
    tag
) VALUES 
    ('Algeria'),
    ('Saudi Arabia'),
    ('Italy'),
    ('Mexico'),
    ('Brazil'),
    ('United States');

INSERT INTO users_tags (
    user_id, tag_id
) VALUES 
    ('AlgerianStudents', 1),
    ('AlgerianStudents', 6);

INSERT INTO  header_situations (
    header_situation
) VALUES 
    ('When I arrive late'),
    ('When I have a question'),
    ('When I work on group projects'),
    ('When I am unprepared'),
    ('When I have homework'),
    ('When I get hungry'),
    ('When I address the teacher'),
    ('When I want to use a computer or phone'),
    ('When I want to show the teacher I am paying attention'),
    ('The type of students I expect to see');


INSERT INTO header_specifications (
    header_specification
) VALUES 
    ('to class'),
    ('in class'),
    ('during a lecture'),
    ('for a test');

INSERT INTO reference_points (
    type,
    sparker,
    thought,
    observation, 
    response,
    emotions,
    universal,
    action,
    qualities,
    connection_point,
    inDirectory,
    user_id,
    header_situation_id,
    header_specification_id,
    header_tag_id,
    category_id,
    subcategory_id
)
VALUES 
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Arriving late to class', 
        'I step inside, greet the teacher as I walk to a seat', 
        'respectful', 'Sample', true, 'AlgerianStudents', 1, 1, 1, 1, 4),
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Arriving late to class', 
        'I knock on the door, step inside, greet the teacher and say “I’m sorry” as I walks to a seat',
        'respectful', 'Sample', true, 'SaudiArabianStudents', 1, 1, 2, 1, 4),
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Arriving late to class', 
        'I knock on the door, step inside and say, “Sorry” and wait for the teacher to give me permission to sit down.', 
        'respectful', 'Sample', true, 'ItalianStudents', 1, 1, 3, 1, 4),
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Arriving late to class', 
        'I slip in quietly and sit at the first available seat. At that time, I must explain why I am late only if the teacher asks', 
        'respectful', 'Sample', true, 'MexicanStudents', 1, 1, 4, 1, 4),
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Arriving late to class', 
        'I slip in quietly and sit at the first available seat. At that time, I must explain why I am late only if the teacher asks', 
        'respectful', 'Sample', true, 'BrazilianStudents', 1, 1, 5, 1, 4),
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Arriving late to class', 
        'I slip in quietly and sit at the first available seat. I may apologize to the teacher after class', 
        'respectful', 'Sample', true, 'AmericanStudents', 1, 1, 6, 1, 4),
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Have a question during a lecture', 
        'I just talk if I have something to say until the professor insists on some order.', 
        'Attentive', 'Sample', false, 'AlgerianStudents', 2, 3, 1, 1, 4),
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Have a question during a lecture', 
        'I raise  my hand and ask the teacher my question.', 
        'Attentive', 'Sample', false, 'SaudiArabianStudents', 2, 3, 2, 1, 4),
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Have a question during a lecture', 
        'I raise  my hand and ask the teacher my question.', 
        'Attentive', 'Sample', false, 'ItalianStudents', 2, 3, 3, 1, 4),
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Have a question during a lecture', 
        'I may ask the teacher during the class or I may ask a classmate after class.', 
        'Attentive', 'Sample', false, 'MexicanStudents', 2, 3, 4, 1, 4),
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Have a question during a lecture', 
        'I may ask the teacher during the class or I may ask a classmate after class.', 
        'Attentive', 'Sample', false, 'BrazilianStudents', 2, 3, 5, 1, 4),
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Have a question during a lecture', 
        'I raise  my hand and ask the teacher my question.', 
        'Attentive', 'Sample', false, 'AmericanStudents', 2, 3, 6, 1, 4),
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'How to show the teacher I am listening', 
        'I take notes, nod my head and look directly at teacher.', 
        'Attentive', 'Sample', true, 'AlgerianStudents', 9, 2, 1, 1, 1), 
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'How to show the teacher I am listening', 
        'I cross my arms across my chest and look directly at the teacher.', 
        'Attentive', 'Sample', true, 'SaudiArabianStudents', 9, 2, 2, 1, 1),
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'How to show the teacher I am listening', 
        'I take notes, nod my head and look directly at the teacher.', 
        'Attentive', 'Sample', true,'ItalianStudents', 9, 2, 3, 1, 1),  
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'How to show the teacher I am listening', 
        'I ask questions or make comments. I may or may not take notes.', 
        'Attentive', 'Sample', true, 'MexicanStudents', 9, 2, 4, 1, 1),  
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'How to show the teacher I am listening', 
        'I ask questions or make comments. I may or may not take notes.', 
        'Attentive', 'Sample', true, 'BrazilianStudents', 9, 2, 5, 1, 1),  
    ('Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'How to show the teacher I am listening', 
        'I take notes, nod my head and look directly at the teacher.', 
        'Attentive', 'Sample', true, 'AmericanStudents', 9, 2, 6, 1, 1);  

INSERT INTO bookmarks (
    user_id, reference_point_id
) VALUES
    ('AlgerianStudents', 2),
    ('AlgerianStudents', 3),
    ('SaudiArabianStudents', 4),
    ('SaudiArabianStudents', 5);


INSERT INTO tags_reference_points (
    tag_id, reference_point_id
) VALUES
    (1, 1),
    (1, 7),
    (2, 2),
    (2, 8);


    