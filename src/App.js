import React, { Component } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { PackageSearch } from './components/PackageSearch';
import { ContentSearch } from './components/ContentSearch';
import { Package } from './components/Package';

import { getPackage, savePackage, searchPackages } from './services/packages';

import { TEST_DATA } from './util/test-data';

const PACKAGE_SIZE = 9;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = TEST_DATA;
  }

  update(key, value) {
    const before = this.state[key];
    const after = Object.assign({}, before, value);

    const newPartialState = {};
    newPartialState[key] = after;

    this.setState(newPartialState);
  }

  setPackage = (id) => {
    this.update("editor", { loading: true, thePackage: null });

    getPackage(id).then(thePackage => {
      this.update("editor", { loading: false, thePackage });
      this.update("packageSearch", { text: thePackage.title });
    })
  }

  packageSearch = (text) => {
    this.update("packageSearch", { loading: true, text });

    // TODO MRB: generic error handling
    searchPackages(text).then(results => {
      this.update("packageSearch", { loading: false, results });
    });
  }

  updatePackage = (packageBefore) => {
    // ensure there's a drop-zone at the end for
    // stories that are just linking to the package
    const content = packageBefore.content.slice();
    if(content[content.length - 1] !== null) {
      content.push(null);
    }
    
    const thePackage = Object.assign({}, packageBefore, { content });

    savePackage(thePackage.id, thePackage);
    this.update("editor", { thePackage });
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
            <PackageSearch
              onChange={this.setPackage}
              onSearchChange={this.packageSearch}
              {...this.state.packageSearch}
            />
            <Package
              size={PACKAGE_SIZE}
              onChange={this.updatePackage}
              {...this.state.editor}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>;
  }
}

export default DragDropContext(HTML5Backend)(App);
