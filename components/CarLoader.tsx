import { css, keyframes } from "@emotion/react"

const shake = keyframes`
  0% {
    transform: translateY(-1%);
  }
  100% {
    transform: translateY(3%);
  }
`

const line = keyframes`
  0% {
    stroke-dashoffset: 22;
  }

  25% {
    stroke-dashoffset: 22;
  }

  50% {
    stroke-dashoffset: 0;
  }

  51% {
    stroke-dashoffset: 0;
  }

  80% {
    stroke-dashoffset: -22;
  }

  100% {
    stroke-dashoffset: -22;
  }
`

const loaderStyles = css({
  minHeight: '50vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: 20,
  padding: '40px 20px',
  '@media (max-width: 480px)': {
    padding: '20px',
    gap: 15,
    minHeight: '40vh'
  }
})

const carBodyStyles = css({
  animation: `${shake} 0.2s ease-in-out infinite alternate`,
})

const carLineStyles = css({
  transformOrigin: 'center right',
  strokeDasharray: 22,
  animation: `${line} 0.8s ease-in-out infinite`,
  animationFillMode: 'both',
})

const carLineTopStyles = css({
  transformOrigin: 'center right',
  strokeDasharray: 22,
  animation: `${line} 0.8s ease-in-out infinite`,
  animationFillMode: 'both',
  animationDelay: '0s',
})

const carLineMiddleStyles = css({
  transformOrigin: 'center right',
  strokeDasharray: 22,
  animation: `${line} 0.8s ease-in-out infinite`,
  animationFillMode: 'both',
  animationDelay: '0.2s',
})

const carLineBottomStyles = css({
  transformOrigin: 'center right',
  strokeDasharray: 22,
  animation: `${line} 0.8s ease-in-out infinite`,
  animationFillMode: 'both',
  animationDelay: '0.4s',
})

export const CarLoader = () => {
  return (
    <div css={loaderStyles}>
      <svg
        className="car"
        width="102"
        height="40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(2 1)" stroke="#EAC645" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
          <path css={carBodyStyles} d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01" strokeWidth="3"/>
          <ellipse className="car__wheel--left" strokeWidth="3.2" fill="#FFF" cx="83.493" cy="30.25" rx="6.922" ry="6.808"/>
          <ellipse className="car__wheel--right" strokeWidth="3.2" fill="#FFF" cx="46.511" cy="30.25" rx="6.922" ry="6.808"/>
          <path css={carLineTopStyles} d="M22.5 16.5H2.475" strokeWidth="3"/>
          <path css={carLineMiddleStyles} d="M20.5 23.5H.4755" strokeWidth="3"/>
          <path css={carLineBottomStyles} d="M25.5 9.5h-19" strokeWidth="3"/>
        </g>
      </svg>
      <p css={css({
        color: '#EAC645',
        fontSize: 18,
        fontWeight: 700,
        marginTop: 20,
        '@media (max-width: 480px)': {
          fontSize: 16,
          marginTop: 15
        }
      })}>読み込み中...</p>
    </div>
  )
}
