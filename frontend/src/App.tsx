import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

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
import Emp from './components/Employee/Emp';
import { idCardOutline, personOutline } from 'ionicons/icons';
import Department from './pages/Department';
setupIonicReact();

const App: React.FC = () => (
  
  <IonApp>
    <IonReactRouter>
      <IonTabs>
      <IonRouterOutlet>
      <Redirect exact path="/" to="/employee" />
        <Route exact path="/employee">
          <Home />
        </Route>  
        <Route exact path="/department">
          <Department />
        </Route>  
      </IonRouterOutlet>
  
      <IonTabBar slot='bottom'>
        <IonTabButton tab='employee' href='/employee'>
          <IonIcon icon={personOutline} />
          <IonLabel>Nhân Viên</IonLabel>
        </IonTabButton>
        <IonTabButton tab='department' href='/department'>
          <IonIcon icon={idCardOutline} />
          <IonLabel>Phòng</IonLabel>
        </IonTabButton>
      </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
