import React, {createContext} from 'react';
import { Switch, Route } from 'react-router-dom';
import {BreweryDetails} from "../containers/BreweryDetails";
import Main from "../containers/Main"
export default function Index() {
    return (
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/breweryDetails" component={BreweryDetails} />
            <Route component={Main} />
        </Switch>
    );
}