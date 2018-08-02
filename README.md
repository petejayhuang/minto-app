Style Guidelines
// Z indices
// error notification 1000
// loading UI 900
// navigation 800

BE TODO

- get all: users / products / orders
- get a: category

---

CLIENT TODO

- 07-07-2018 app style
- 07-07-2018 make things pure components
- 07-07-2018 pass categories to update via action
- 07-07-2018 connect search to endpoint
- 07-07-2018 separate out payment logic to relevant flows
  - user adds payment card details
  - when they click buy, check if they are a customer, if not, create one
  - createTransaction amount shouldn't be dictated by me, BE should look up product_id and use that value
- 07-07-2018 make admin app!
- 12-07-2018 refactor updateUser action to accept all
- 12-07-2018 update user, doesn't subsequently redirect
- 12-07-2018 sort redirects!

CLIENT DONE

- 07-07-2018 07-07-2018 logout
- 07-07-2018 07-07-2018 username isn't updated? - my fault
- 07-07-2018 07-07-2018 settings/payment
- 07-07-2018 07-07-2018 after adding a new user, it doesn't redirect
- 07-07-2018 07-07-2018 hijack the forward and back buttons on browser (history api to push/pop url)
- 10-07-2018 07-07-2018 create cart page
- 10-07-2018 07-07-2018 create like page
- 10-07-2018 need a profile image route
- 12-07-2018 make bottom nav go to dynamic store
- 14-07-2018 create message from product
- 14-07-2018 can't get store products?
- 14-07-2018 create new message from store/ product => redirect and refresh page as appropriate
- 16-07-2018 when editing product, checkboxes cannot be unchecked!
- 16-07-2018 update product, doesn't subsequently redirect

ADMIN TODO

- routes:
  - /products
  - /users
  - /categories
  - /orders
- redirect after update/ delete
- product, user, order approvals
- research: can we have buckets that are both private & public (profile passport photos/ product photos)
