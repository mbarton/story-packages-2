import React, { Component } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { ContentSearch } from './components/ContentSearch';
import { Package } from './components/Package';

import { TEST_DATA } from './util/test-data';

const PACKAGE_SIZE = 9;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = TEST_DATA;
  }

  updatePackage = (p) => {
    this.setState({ package: p });
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
            <Package size={PACKAGE_SIZE} onChange={this.updatePackage} thePackage={this.state.package} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>;
  }
}

export default DragDropContext(HTML5Backend)(App);
