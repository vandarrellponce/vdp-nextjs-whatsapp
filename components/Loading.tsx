import { Circle } from 'better-react-spinkit'

const Loading = () => {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="https://1000logos.net/wp-content/uploads/2021/04/WhatsApp-logo.png"
          alt="loading"
          height={200}
          style={{ marginBottom: 40 }}
        />
        <Circle color="#3CBC28" size={60} />
      </div>
    </div>
  )
}

export default Loading
