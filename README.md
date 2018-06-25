Style Guidelines
// Z indices
// error notification 1000
// loading UI 900
// navigation 800
//

To do
[ ] app style
[ ] do a list of all front end routes / how do we check routes in a smart way?
[ ] make <ImageGrid /> a pure component
[ ] pass categories to update via
[ ] hijack the forward and back buttons on browser (history api to push/pop url)
[ ] need a profile image route

ACTIONS

action.loading, action.error are global
you could create an object for action.error payload,
where it looks like { errorMessage: 'Something went wrong', error: error}
