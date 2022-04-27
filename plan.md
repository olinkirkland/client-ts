ROUTES

/

/login
/register
/guest

/me
/verify-session

/user/:id,:id,:id
{nick: 'bob', gold: 12, experience: 55, level: 2}
/user/:id/info
{nick: 'bob', gold: 12, experience: 55, level: 2, friends: ['1f30d0', '995f2j'], items: ['330fjf'], achievements: ['139x4f']}

/friends
{'1f30d0', '995f2j'}
/friends/add/:id
{id: '995f2j', type: 'request'}
{id: '995f2j', type: 'add'}
/friends/remove/:id
{id: '995f2j'}

/party/:id/join
/party/leave

/play/:game
/play/:game/:id
/play/:game/:id/settings

MIDDLEWARES

verifyToken(req, res, next)

SYNTAX

router.post('/login', login);
router.post('/register', register);
router.get('/me', verifyToken, getUserInfo);
router.get('/verify-session', verifyToken, approveSession);

FLOW

1) User is auth’d (as anon or logged in user)
2) User connects to socket-server

HOSTING A GAME

1) User wants to host a game, clicks host button which sends a request for a new GameSession to the backend
2) Backend creates a GameSession server-side, and adds the user to a room with the same id
3) Users always initially join a GameSession as a spectator


GameSession
 id // Generated when the room was created, used as the id of the room the users connect to
 users // All of the users currently connected to this room
 players // A subset of the users currently playing
 spectators // A subset of the users currently spectating
 set joinRule // JoinRule.OPEN, JoinRule.CLOSED, JoinRule.FRIENDS, JoinRule.INVITE
 get joinRule
 join(user) // If the user passes the joinRule, then add them to the GameSession and return true, else return false
 inProgress // Returns TRUE when the GameSession is in progress, FALSE if it's in lobby-mode

User
 id
 role // UserRole.HOST, UserRole.SPECTATOR, UserRole.PLAYER

What messages does a GameSession broadcast to connected users?
 - user-joined // userId
 - user-left // userId
 - game-countdown // startTime
 - game-start // users (array of userIds)
 - game-end // scoreboard
 - chat // message, userId

What messages does a GameSession accept from all connected users?

When a user goes offline, the GameSession will close if users.length == 0

New users can be added to a GameSession at any time, even when a game is in progress. However, they will be locked into the spectator role if the GameSession is in progress.

// onClick={() => {
//   console.log('clicked!');
//   axios
//     .get('https://dontfall-backend.herokuapp.com/testcors')
//     .then((res) => {
//       console.log(res);
//     });
// }}