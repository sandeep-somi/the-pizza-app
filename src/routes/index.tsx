import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Payment from "../containers/payment";
import Recipe from "../containers/recipe";
import User from '../containers/user';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={User} />
        <Route path="/recipe" exact component={Recipe} />
        <Route path="/payment" exact component={Payment} />
      </Switch>
    </Router>
  )
}