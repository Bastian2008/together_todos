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
import { images, square, triangle, chevronBack, chevronForward } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

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

const App: React.FC = () => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonMenu contentId="main" disabled={isMenuCollapsed}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>{!isMenuCollapsed && 'Menu'}</IonTitle>
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
              <IonList>
                <IonItem routerLink="/tab1">
                  <IonIcon aria-hidden="true" slot="start" icon={triangle} />
                  {!isMenuCollapsed && <IonLabel>Tab 1</IonLabel>}
                </IonItem>
                <IonItem routerLink="/tab2">
                  <IonIcon slot="start" icon={images} />
                  {!isMenuCollapsed && <IonLabel>Photos</IonLabel>}
                </IonItem>
                <IonItem routerLink="/tab3">
                  <IonIcon aria-hidden="true" slot="start" icon={square} />
                  {!isMenuCollapsed && <IonLabel>Tab 3</IonLabel>}
                </IonItem>
              </IonList>
            </IonContent>
          </IonMenu>
          {isMenuCollapsed && <IonButton
            fill="clear"
            onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
            style={{ '--max-width': '10px' }}
            aria-label={isMenuCollapsed ? 'Expand menu' : 'Collapse menu'}
          >
            <IonIcon icon={isMenuCollapsed ? chevronForward : chevronBack} />
          </IonButton>}
          <IonRouterOutlet id="main">
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
