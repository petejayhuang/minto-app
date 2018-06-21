Style Guidelines
// Z indices
// error notification 1000
// loading UI 900
// navigation 800
//

To do
[ ] work with browser history api to push/pop url
[ ] app style
[ ] use Pure.Component

[ ] how do we check routes in a smart way?
[ ] do a list of all front end routes:
[ ] make <ImageGrid /> a pure component

/

/login
/feed
/search

/username/products/:product_id
/username/messages/recipient
/username/settings/

ACTIONS

action.loading, action.error are global
you could create an object for action.error payload,
where it looks like { errorMessage: 'Something went wrong', error: error}
