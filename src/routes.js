import React, {createContext} from 'react';
import { Switch, Route } from 'react-router-dom';
import BreweryDetails from "../src/containers/BreweryDetails";
import Main from "../src/containers/Main"
export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/breweryDetails" component={BreweryDetails} />
            <Route component={Main} />
        </Switch>
    );
}