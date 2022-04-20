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

User reaches /
User is prompted to either login, register, or continue as guest
