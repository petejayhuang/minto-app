import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Container = styled.div`
  height: 150px;

  .content {
    background-size: cover;
    width: 100%;
    height: 100%;
    color: white;
  }
`

const CategoryCard = props => {
  const { backgroundImage, title } = props
  return (
    <Container>
      <div
        className="content flex-row center-center"
        style={{
          backgroundImage
        }}
      >
        <h1 className="p-0 m-0">{title}</h1>
      </div>
    </Container>
  )
}

export default CategoryCard

CategoryCard.propTypes = {
  backgroundImage: PropTypes.string,
  title: PropTypes.string
}

CategoryCard.defaultProps = {
  backgroundImage: "url()",
  title: "CATEGORY"
}
