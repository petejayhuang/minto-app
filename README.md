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
- 07-07-2018 make <ImageGrid /> a pure component
- 07-07-2018 pass categories to update via action
- 07-07-2018 need a profile image route
- 07-07-2018 connect search to endpoint
- 07-07-2018 separate out payment logic to relevant flows
  - user adds payment card details
  - when they click buy, check if they are a customer, if not, create one
  - createTransaction amount shouldn't be dictated by me, BE should look up product_id and use that value
- 07-07-2018 make admin app!

CLIENT DONE

- 07-07-2018 07-07-2018 logout
- 07-07-2018 07-07-2018 username isn't updated? - my fault
- 07-07-2018 07-07-2018 settings/payment
- 07-07-2018 07-07-2018 after adding a new user, it doesn't redirect
- 07-07-2018 07-07-2018 hijack the forward and back buttons on browser (history api to push/pop url)
- 07-07-2018 07-07-2018 create cart page
- 07-07-2018 07-07-2018 create like page

ADMIN TODO

- routes:
  - /products
  - /users
  - /categories
  - /orders
- redirect after update/ delete
- product, user, order approvals
- research: can we have buckets that are both private & public (profile passport photos/ product photos)
