import React, { Component } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { PackageSearch } from './components/PackageSearch';
import { ContentSearch } from './components/ContentSearch';
import { Package } from './components/Package';

import { packages as packagesModel } from './model/packages';

import { getLatestItems } from './services/capi';

import { TEST_DATA } from './util/test-data';

const PACKAGE_SIZE = 9;

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = TEST_DATA;
    this.packages = packagesModel(this);
  }

  componentDidMount() {
    getLatestItems().then(this.setContentSearchResults);
  }

  setContentSearchResults = (results) => {
    // this.update("contentSearch", { loading: false, results });
  }

  render() {
    return <Container fluid>
      {/* Semantic UI Grid has 16 divisions */}
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={6}>
            <ContentSearch {...this.state.contentSearch} />
          </Grid.Column>
          <Grid.Column width={10}>
            <PackageSearch
              onChange={this.packages.setPackage}
              onSearchChange={this.packages.packageSearch}
              {...this.state.packageSearch}
            />
            <Package
              size={PACKAGE_SIZE}
              onChange={this.packages.updatePackage}
              {...this.state.editor}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>;
  }
}

export default DragDropContext(HTML5Backend)(App);
