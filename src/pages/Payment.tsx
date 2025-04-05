import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonInput, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import './Payment.css';

const Payment: React.FC = () => {
  // State for form inputs
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolderName, setCardHolderName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [csv, setCsv] = useState<string>('');

  // Handle form submission (For now, log the data)
  const handleSubmit = () => {
    console.log({
      cardNumber,
      cardHolderName,
      address,
      expiryDate,
      csv
    });
    // Add Firebase saving or other processing logic here
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
        <div style={{
          height: '26px',
          width: '100%',
          backgroundColor: 'black',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999
          //padding: '5px 5px'
        }}></div>
        <IonToolbar style={{ marginTop: '24px' }}>
            {/* Use IonButtons to place the back button on the left side */}
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/tab3" />
            </IonButtons>
            <IonTitle>Payment</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {/* Card Information Form */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Enter Payment Information</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <IonItem className="custom-item">
                <IonInput
                  value={cardNumber}
                  onIonChange={e => setCardNumber(e.detail.value!)}
                  type="tel"
                  maxLength={16}
                  placeholder="Enter your card number"
                />
              </IonItem>

              <IonItem className="custom-item">
                <IonInput
                  value={cardHolderName}
                  onIonChange={e => setCardHolderName(e.detail.value!)}
                  placeholder="Enter the name on the card"
                />
              </IonItem>

              <IonItem className="custom-item">
                <IonInput
                  value={address}
                  onIonChange={e => setAddress(e.detail.value!)}
                  placeholder="Enter the billing address"
                />
              </IonItem>

              <IonItem className="custom-item">
                <IonInput
                  value={expiryDate}
                  onIonChange={e => setExpiryDate(e.detail.value!)}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </IonItem>

              <IonItem className="custom-item">
                <IonInput
                  value={csv}
                  onIonChange={e => setCsv(e.detail.value!)}
                  type="number"
                  maxLength={3}
                  placeholder="Enter the 3-digit CSV"
                />
              </IonItem>

              {/* Submit Button */}
              <IonButton expand="full" onClick={handleSubmit} color="success" className="ion-margin-top">
                Submit Payment
              </IonButton>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Payment;
