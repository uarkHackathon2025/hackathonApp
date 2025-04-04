import React from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
import AuthPage from './pages/AuthPage';

/* Ionic core & utility CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const MainApp: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <IonSplitPane contentId="main">
      {!isAuthPage && <Menu />}

      <IonRouterOutlet id="main">
        <Route path="/" exact>
          <Redirect to="/auth" />
        </Route>
        <Route path="/auth" exact>
          <AuthPage />
        </Route>
        <Route path="/folder/:name" exact>
          <Page />
        </Route>
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <MainApp />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
