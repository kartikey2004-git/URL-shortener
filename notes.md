createBrowserRouter function use jo ki parameter mein array of objects leta hai
and router provider

useNavigate ()
useSearchParams()


ek dynamic variable :id in app.jsx jaha pr hum routing kr rhe hai

destructive in landing page jsx button kaise lagana hai red button wo check krna hai



Here’s the SQL query to create a table named urls with the required columns and enable Row-Level Security (RLS) in Supabase, including setting up the foreign key relationship to auth.users:

```markdown

-- Create the table 'urls'
CREATE TABLE urls (
    id INT8 PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    original_url TEXT NOT NULL,
    short_url TEXT NOT NULL,
    custom_url TEXT,
    user_id UUID REFERENCES auth.users(id),
    title TEXT UNIQUE NOT NULL,
    qr TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE urls ENABLE ROW LEVEL SECURITY;

-- Optionally, create a policy to allow the owner (user) to access their own rows
CREATE POLICY "user_can_access_their_own_urls"
ON urls
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "user_can_insert_their_own_urls"
ON urls
FOR INSERT WITH CHECK (user_id = auth.uid());

```

Explanation:

The id column is a TEXT type and is the primary key.

The created_at column uses TIMESTAMPTZ and defaults to the current timestamp.

user_id is set as a foreign key to auth.users to maintain a reference to the authenticated users.

The row-level security (RLS) policies ensure that users can only access and insert their own data.



Creating API for login and SignUp
for that we have to interact with our database


Supabase Auth allows you to create and manage user sessions for access to data that is secured by access policies.

react spinner is used...

Yup, a popular schema validation library,
yup library for login/ signup validation(ye padh skte hai link youtube roadside coder)

and jab ye logging in hoga toh ek api call hogi , jiske spinner jo hai uska loading indicator aayega


when we have to make api call  , then multiple things involved , then we have to handle the loading stuff as well as before and after api call to just display the loader

and we have to handle errors as well everything
insted of repetation throught the project , we made a custom hook.. for handling api calls

iska course le skte hai for react interviews preparations that how to create custom-hooks
use-counter
use-debounce
use-fetch
use-intersection-object
use-localstorage
use-windowsize

performance optimization and machine coding content as well , toh yaha se dekh lunga ki course content and google and chatgpt krlunga