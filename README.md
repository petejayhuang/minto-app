#Style Guidelines

##Z indices

- error notification 1000
- loading UI 900
- navigation 800

#TODO short term

- back button: store > product oR feed > product

#TODO long term

- validation on inputs
- topNav spacing of elements
- add redux dev tools: https://github.com/reduxjs/redux-devtools/blob/master/docs/Walkthrough.md
- back on certain flows & go back once
- cancel requests on new route changes
- success and error notifications in 1 component

#NOPE

- add fb to landing
- remove ability to message person
- fix errors & warnings
- hijack forward and back buttons
- hamburger menu should have go to product => BUILD DROPDOWN?

#DONE

- improve FB login button
- separate get first set of products, and then get more products
- validation on input to be number
- fix warning: checkboxes go from uncontrolled to controlled input
- reset the search page on component mount
- add loading spinner & disable button when doing something async
- fix the bottom nav going to /login when log in first time (no refresh)
- home make facebook login
- improve update profile
- if not logged in, don't show message seller (redirect)
- sync staging and master now
- privacy policy
- design inputs
- chat bubbles!
- facebook URI!
- success message
- new store => refetch
- align the message send button & input
- store => undefined
- facebook login
- form validations (sign up, add product)
- buy flow
- can't see message seller if it's yourself!
- search functionality
- fix loading overlay
- bottom nav bar not showing
- logged out, bottom nav, when click => /login page, but allow visits to /store/:id
- better landing
- don’t show profile pages etc when logged out (show login page instead)
- text in “next” button
- press "enter" should send message
- fix merge problems

BE

- repeated products in the FEED products response
- can't delete my own product
- can't update delivery fields
