import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonLoading,
  IonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group'; //for animations maybe in the future
import './AuthPage.css'

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      if (isSignup) {
        // Simulate signup logic (replace with your actual signup logic)
        console.log('Signing up:', email, password);
        //Example of error.
        if (email === "error@error.com"){
          setAlertMessage("Signup failed");
          setShowAlert(true);
        } else {
          //Navigate to homepage. Signup success!
          history.push('/folder/inbox');
        }

      } else {
        // Simulate login logic (replace with your actual login logic)
        console.log('Logging in:', email, password);
        if(email === "test@test.com" && password === "password"){ // email exists in database SANTOSH
          history.push('/folder/inbox'); //login
        } else {
          setAlertMessage("Invalid Credentials");
          setShowAlert(true);
        }
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      setAlertMessage('Authentication failed');
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>

      <IonHeader className={isSignup ? 'auth-signup' : 'auth-login'}>
        <IonToolbar>
          <IonTitle>{isSignup ? 'Signup' : 'Login'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={`ion-padding ${isSignup ? 'auth-signup' : 'auth-login'}`}>
        <IonList className={isSignup ? 'auth-signup' : 'auth-login'}>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
          </IonItem>
        </IonList>
        <IonButton expand="block" onClick={handleAuth} disabled={isLoading}>
          {isSignup ? 'Signup' : 'Login'}
        </IonButton>
        <IonButton 
          style={{'--background': isSignup ? '#007bff' : '#ffffff'}}
          expand="block" 
          fill="clear" 
          onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
        </IonButton>

        <IonLoading isOpen={isLoading} message={isSignup ? 'Signing up...' : 'Logging in...'} />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default AuthPage;