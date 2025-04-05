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
import { homeOutline, navigateOutline, settingsOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1'; //settings
import Tab2 from './pages/Tab2'; //home
import Tab3 from './pages/Tab3'; //navigation
import AuthPage from './pages/AuthPage'; //authPage
import ItemDetailPage from './pages/ItemDetailPage'; //Item Details


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


/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
//import '@ionic/react/css/palettes/dark.system.css';
import '@ionic/react/css/palettes/dark.always.css';

/* Theme variables */
import './theme/variables.css';

//Map
import Map from './components/Map';

setupIonicReact();


const App: React.FC = () => (

  <IonApp>
    
    <IonReactRouter>
      
      <IonRouterOutlet>
        {/* Route for AuthPage */}
        <Route exact path="/auth">
          <AuthPage />
        </Route>

        {/* Default route redirects to AuthPage */}
        <Route exact path="/">
          <Redirect to="/auth" />
        </Route>

        {/* Tabs wrapped inside their own route */}
        <Route path="/tabs">
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/tabs/tab1">
                <Tab1 />
              </Route>
              <Route exact path="/tabs/tab2">
                <Tab2 />
              </Route>
              <Route path="/tabs/tab3">
                <Tab3 />
              </Route>
              <Route path="/tabs/item/:id" component={ItemDetailPage} exact />              

            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/tabs/tab1">
                <IonIcon aria-hidden="true" icon={navigateOutline} />
                <IonLabel>Navigation</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab2" href="/tabs/tab2">
                <IonIcon aria-hidden="true" icon={homeOutline} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tabs/tab3">
                <IonIcon aria-hidden="true" icon={settingsOutline} />
                <IonLabel>Settings</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
