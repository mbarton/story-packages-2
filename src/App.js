import React, { Component } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

import { ContentSearch } from './components/ContentSearch';
import { Package } from './components/Package';

import { TEST_DATA } from './util/test-data';

const PACKAGE_SIZE = 9;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = TEST_DATA;
  }

  render() {
    return <Container fluid>
      {/* Semantic UI Grid has 16 divisions */}
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={6}>
            <Segment>
              <ContentSearch {...this.state.contentSearch} />
            </Segment>
          </Grid.Column>
          <Grid.Column width={10}>
            <Package size={PACKAGE_SIZE} {...this.state.package} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>;
  }
}

export default App;
