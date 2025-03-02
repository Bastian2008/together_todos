import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list } from 'ionicons/icons';
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
import { useEffect, useState } from 'react';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <Route exact path="/login" component={Login} />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      
      <IonTabs>
        <IonRouterOutlet>
          <PrivateRoute exact path="/tab1" component={Tab1} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={list} />
            <IonLabel>Checklists</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
