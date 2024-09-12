import Router from 'helpers/router/Router';
import SelfAssessment from 'helpers/selfAssessment/selfAssessment';

class App {
  public start() {
    new Router();
    new SelfAssessment();
  }
}

export default App;
