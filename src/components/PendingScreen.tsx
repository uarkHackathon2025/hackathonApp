import './PendingScreen.css';

const PendingScreen: React.FC = () => {
  return (
    <div className="pending-overlay">
      <div className="pending-box">
        <h2 className="pop-in">🚗 Driver found!<br />Waiting for drop-off</h2>
        <p className="fade-loop">Your adventure will begin soon...</p>
      </div>
    </div>
  );
};

export default PendingScreen;
