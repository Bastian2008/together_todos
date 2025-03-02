import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const history = useHistory();

  const handleLogin = () => {
    // Simply set authentication and redirect to Tab1
    localStorage.setItem('isAuthenticated', 'true');
    history.push('/tab1');
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="login-container">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Login</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  placeholder="Enter your email"
                  clearInput={true}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  placeholder="Enter your password"
                  clearInput={true}
                />
              </IonItem>

              <IonButton
                expand="block"
                className="ion-margin-top"
                onClick={handleLogin}
                strong={true}
              >
                Login
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login; 