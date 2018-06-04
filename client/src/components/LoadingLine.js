import styled from "styled-components"

const LoadingBar = styled.div`
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 3px;
  color: #fff;
  background: linear-gradient(90deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: Gradient 2s ease infinite;
  @keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`

export default LoadingBar
