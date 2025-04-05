// src/pages/AccountInfo.tsx
import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonInput, IonLabel, IonItem, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import './AccountInfo.css';

const AccountInfo: React.FC = () => {
  // State variables for input values
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dobDay, setDobDay] = useState('');
  const [dobMonth, setDobMonth] = useState('');
  const [dobYear, setDobYear] = useState('');

  // Handle form submission (send data to Firebase)
  const handleSubmit = () => {
    // Replace with Firebase integration
    console.log('Sending data to Firebase:', { name, phone, email, dobDay, dobMonth, dobYear });
    // 🔥 Firebase logic here to send data to the database
  };

  // Generate days, months, and years for selection
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 100 }, (_, i) => (2023 - i).toString()); // From current year to 100 years ago

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              {/* Back Button */}
              <IonBackButton defaultHref="/tabs/tab3" />
            </IonButtons>
            <IonTitle>Account Info</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {/* Form UI */}
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput 
              value={name} 
              onIonInput={(e) => setName(e.detail.value!)} 
              pattern="[A-Za-z ]*" 
              required 
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Phone Number</IonLabel>
            <IonInput 
              value={phone} 
              onIonInput={(e) => setPhone(e.detail.value!)} 
              pattern="[\+0-9\-\(\)]*" 
              required 
              type="tel"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput 
              value={email} 
              onIonInput={(e) => setEmail(e.detail.value!)} 
              type="email" 
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" 
              required 
            />
          </IonItem>

          {/* Birthday Section */}
          <IonItem lines="none">
            <IonLabel><strong>Birthday</strong></IonLabel>
          </IonItem>

          {/* Indented Birthday Fields */}
          <IonItem>
            <IonLabel>Day</IonLabel>
            <IonSelect value={dobDay} onIonChange={(e) => setDobDay(e.detail.value)} placeholder="Select Day">
              {days.map((day) => (
                <IonSelectOption key={day} value={day}>{day}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Month</IonLabel>
            <IonSelect value={dobMonth} onIonChange={(e) => setDobMonth(e.detail.value)} placeholder="Select Month">
              {months.map((month) => (
                <IonSelectOption key={month} value={month}>{month}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Year</IonLabel>
            <IonSelect value={dobYear} onIonChange={(e) => setDobYear(e.detail.value)} placeholder="Select Year">
              {years.map((year) => (
                <IonSelectOption key={year} value={year}>{year}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          {/* Submit Button */}
          <div className="ion-text-center">
            <IonButton expand="block" onClick={handleSubmit}>Submit</IonButton>
          </div>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default AccountInfo;
