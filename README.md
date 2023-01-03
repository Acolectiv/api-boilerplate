# Express 4 API Boilerplate

# .env example:
```
MONGODB_URI=
JWT_TOKEN=
```

# Features:
  - [x] UserManager -> userExists(); findUserByUsername(); createUser(); loginUser().
                     set { memoryCaching: true } if you want to store data in the cache.
  - [x] MemoryStore -> put(), get(), has().
  - [x] Routes -> /api/accounts/create (creates an user)
             -> /api/accounts/login (logins an user)
             -> /api/accounts/retrieve/:username (gets users info based on the username)
