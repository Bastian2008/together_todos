import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonSplitPane,
  IonButton,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, chevronBack, chevronForward } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Custom styles for the menu */
import './theme/menu.css';
import { useState } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  return (
    <IonApp>
      <IonReactRouter>
        <Route exact path="/login" component={Login} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        
        <IonSplitPane contentId="main" when="md">
          <IonMenu contentId="main" disabled={isMenuCollapsed}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>{!isMenuCollapsed && 'Lists'}</IonTitle>
                <IonButton
                  slot="end"
                  fill="clear"
                  onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
                  aria-label={isMenuCollapsed ? 'Expand menu' : 'Collapse menu'}
                >
                  <IonIcon icon={isMenuCollapsed ? chevronForward : chevronBack} />
                </IonButton>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList id="checklist-list"></IonList>
            </IonContent>
          </IonMenu>

          {isMenuCollapsed && (
            <IonButton
              fill="clear"
              onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
              style={{ '--max-width': '10px' }}
              aria-label={isMenuCollapsed ? 'Expand menu' : 'Collapse menu'}
            >
              <IonIcon icon={isMenuCollapsed ? chevronForward : chevronBack} />
            </IonButton>
          )}

          <IonRouterOutlet id="main">
            <PrivateRoute exact path="/tab1" component={Tab1} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
