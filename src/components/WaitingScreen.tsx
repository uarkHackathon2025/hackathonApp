import './WaitingScreen.css';

const WaitingScreen: React.FC = () => {
  return (
    <div className="waiting-screen">
      <div className="emoji-flip">⏳</div>
      <h2>Finding a driver...</h2>
    </div>
  );
};

export default WaitingScreen;
