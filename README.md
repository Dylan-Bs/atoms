Atoms
=====

React exercise with a simple emergency light management systems. The backend is
provided, but the frontend is yours to do.  

Backend
-------

Start with `npm start`.

There are several end-points to manage the system.

### Users

Users can have one of two roles: ADMIN or USER. All end-points (except login)
require authentication. Some end-points require the user to have the ADMIN
role.

- `/user` (`GET`): returns all the users.
- `/user/<id>` (`GET`): returns a single user. 
- `/user` (`POST`): creates a new user (ADMIN restricted).  
  Request body should contain a JSON object with name, password, and role. 
- `/user/<id>` (`PUT`): edits a user (ADMIN restricted).  
  Request body should contain a JSON object with name, password, or role. 
- `/user/<id>` (`DELETE`): deletes a user (ADMIN restricted).
- `/me` (`GET`): returns the current user.
- `/login` (`POST`): logs in a user.  
  Request body should contain a JSON object with name and password.
- `/logout` (`POST`): logs out the user.  

### Blocks

Blocks represent emergency lights that can be remotely tested. They can have
different statuses: NOT_TESTED, TESTING, PASS, BATTERY_ISSUE, LIGHT_ISSUE.

- `/block` (`GET`): returns all the blocks.
- `/block/<id>` (`GET`): returns a single block. 
- `/block` (`POST`): creates a new block (ADMIN restricted).  
  Request body should contain a JSON object with name and location. 
- `/block/<id>` (`PUT`): edits a block (ADMIN restricted).  
  Request body should contain a JSON object with name or location. 
- `/block/<id>` (`DELETE`): deletes a block (ADMIN restricted).
- `/block/<id>/test` (`POST`): starts a test. The tes will complete after one minute.
- `/block/<id>/report` (`POST`): reports a status (usually an issue).  
  Request body should contain a JSON object with the status.
