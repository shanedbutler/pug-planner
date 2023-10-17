INSERT INTO public.profiles (
    id,
    first_name,
    last_name,
    email,
    phone,
    club,
    create_date_time,
    primary_position_id,
    secondary_position_id,
    "admin",
    pronoun_id,
    emergency_name,
    emergency_phone,
    active
  )
VALUES (
    '47067117-1501-40a8-a062-8a31984ca1a0',
    'Foo',
    'Barington',
    'foo@bar.com',
    '555-305-2034',
    'LA Galaxy',
    '2023-02-18',
    1,
    2,
    true,
    3,
    'Baz',
    '555-235-5234',
    true
  ),
  (
    '75938190-0886-4f3b-af28-02e316fe47bc',
    'Baz',
    'Billings',
    'bar@baz.com',
    '555-302-5942',
    'Real Madrid',
    '2023-02-18',
    3,
    4,
    false,
    2,
    'Foo',
    '555-230-5912',
    true
  );

INSERT INTO public.games (
    id,
    title,
    "location",
    "address",
    "description",
    game_date,
    signup_date,
    max_players,
    recurring,
    primary_host_id,
    secondary_host_id
  )
VALUES (
    1,
    'Solano Canyon Turf Night',
    'Griffith Park Soccer Field',
    '3343 Riverside Dr, Los Angeles, CA 90027',
    'All skill levels and genders welcome.',
    '2023-12-30T14:30',
    '2023-12-20T21:00',
    11,
    true,
    '47067117-1501-40a8-a062-8a31984ca1a0',
    '75938190-0886-4f3b-af28-02e316fe47bc'
  ),
  (
    2,
    'Weekend Morning Turf ',
    'McAlister Field',
    '3000 S Hoover St, Los Angeles, CA 90089',
    'Good morning! All skill levels and genders welcome.',
    '2023-12-20T10:00',
    '2023-12-10T21:00',
    6,
    false,
    '75938190-0886-4f3b-af28-02e316fe47bc',
    '47067117-1501-40a8-a062-8a31984ca1a0'
  );