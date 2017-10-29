import * as React from 'react';
import { useStrict } from 'mobx';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import { Packages } from './model/package';
import { ContentSearch } from './model/contentSearch';

import { PackageSearch } from './components/PackageSearch';
import { Editor } from './components/Editor';
import { ContentSearch as ContentSearchView } from './components/ContentSearch';

import 'semantic-ui-css/semantic.min.css';

useStrict(true);

class App extends React.Component<{}, {}> {
  packages: Packages = new Packages();
  contentSearch: ContentSearch = new ContentSearch();

  render() {
    return (
      <BrowserRouter>
        <Container fluid={true}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={5}>
                <ContentSearchView model={this.contentSearch} />
              </Grid.Column>
              <Grid.Column width={11}>
                <Route
                  path="/"
                  render={({ history }) => <PackageSearch packages={this.packages} history={history} />}
                />
                <Route
                  path="/packages/:id"
                  render={({ match }) => <Editor packageId={match.params.id} packages={this.packages} />}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
