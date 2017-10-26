import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { PackageSearch } from './components/PackageSearch';
import { ContentSearch } from './components/ContentSearch';
import { Package } from './components/Package';

import { packages as packagesModel } from './model/packages';
import { contentSearch as contentSearchModel } from './model/contentSearch';
import { content as contentModel } from './model/content';

import { StateKeys } from './model/constants';
import { TEST_DATA } from './util/test-data';
import { updateHistory, getPackageId } from './util/history';

import './overrides.css';

const PACKAGE_SIZE = 9;

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = TEST_DATA;
    this.packages = packagesModel(this);
    this.contentSearch = contentSearchModel(this);
    this.content = contentModel(this);

    window.onpopstate = () => {
      this.loadPackageFromUrl();
    }
  }

  componentDidMount() {
    this.loadPackageFromUrl();
    this.contentSearch.search();
  }

  componentDidUpdate(_, prevState) {
    if(this.content.cacheRequiresUpdate(prevState, this.state)) {
      this.content.updateCache(this.state);
    }

    updateHistory(prevState, this.state);
  }

  loadPackageFromUrl() {
    const packageId = getPackageId();

    if(packageId !== null) {
      this.packages.setPackage(packageId);
    } else {
      this.packages.clearPackage();
    }
  }

  render() {
    const cache = this.state[StateKeys.CONTENT];
    const editor = this.state[StateKeys.EDITOR];

    const contentSearch = this.state[StateKeys.CONTENT_SEARCH];
    const packageSearch = this.state[StateKeys.PACKAGE_SEARCH];

    const contentResults = this.content.enrichFromCache(cache, contentSearch.results);
    
    let thePackage = editor.thePackage;
    if(thePackage) {
      const editorResults = this.content.enrichFromCache(cache, thePackage.content);
      thePackage = Object.assign({}, editor.thePackage, { results: editorResults });
    }

    return <Container fluid>
      {/* Semantic UI Grid has 16 divisions */}
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={5}>
            <ContentSearch
              loading={contentSearch.loading}
              results={contentResults}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <PackageSearch
              text={packageSearch.text}
              loading={packageSearch.loading}
              results={packageSearch.results}
              thePackage={thePackage}

              onAddItem={this.packages.addPackage}
              onChange={this.packages.setPackage}
              onSearchChange={this.packages.packageSearch}
            />
            <Package
              size={PACKAGE_SIZE}
              loading={editor.loading}
              thePackage={thePackage}
              onChange={this.packages.updatePackage}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>;
  }
}

export default DragDropContext(HTML5Backend)(App);
