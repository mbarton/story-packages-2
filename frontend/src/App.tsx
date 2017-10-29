import * as React from 'react';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Route, withRouter, RouteComponentProps } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import { Packages } from './model/package';
import { ContentSearch } from './model/contentSearch';
import { Dragging } from './model/dragging';

import { PackageSearch } from './components/PackageSearch';
import { Editor } from './components/Editor';
import { ContentSearch as ContentSearchView } from './components/ContentSearch';

import 'semantic-ui-css/semantic.min.css';

useStrict(true);

class App extends React.Component<RouteComponentProps<{}>, {}> {
  packages: Packages = new Packages(this.props.history);
  contentSearch: ContentSearch = new ContentSearch();
  dragging: Dragging = new Dragging(this.packages);

  render() {
    return (
      <Provider packages={this.packages} dragging={this.dragging}>
        <Container fluid={true}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={5}>
                <ContentSearchView model={this.contentSearch} />
              </Grid.Column>
              <Grid.Column width={11}>
                <Route
                  path="/"
                  render={({ history }) => <PackageSearch packages={this.packages} />}
                />
                <Route
                  path="/packages/:id"
                  render={({ match }) => <Editor packageId={match.params.id} packages={this.packages} />}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Provider>
    );
  }
}

export default withRouter<{}>(App);
