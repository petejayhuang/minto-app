import { GET_PRODUCT_CATEGORIES_SUCCESS } from '../actions/types'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_CATEGORIES_SUCCESS:
      return action.payload.reduce((accum, category) => {
        const { product_type, id } = category
        const newObject = {}
        newObject.label = product_type
        newObject.value = id
        return accum.concat(newObject)
      }, [])
    default:
      return state
  }
}
