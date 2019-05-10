import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';

import routePaths from '../../constants/routePaths';
import RouteWrapper from '../../containers/RouteWrapper/RouteWrapper';

class Router extends PureComponent {
  render() {
    return <Route path={routePaths.INDEX} component={RouteWrapper} />;
  }
}

export default withRouter(Router);
