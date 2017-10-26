import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { BrowserRouter, Route } from 'react-router-dom';

import { ContentSearch } from './components/ContentSearch';
import { PackageSearch } from './components/PackageSearch';
import { PackagePanel } from './components/PackagePanel';

import { packages as packagesModel } from './model/packages';
import { contentSearch as contentSearchModel } from './model/contentSearch';
import { content as contentModel } from './model/content';
import { dragging as draggingModel } from './model/dragging';

import { StateKeys } from './model/constants';
import { TEST_DATA } from './util/test-data';

import './overrides.css';

const PACKAGE_SIZE = 9;

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = TEST_DATA;
    this.dragOverPackageEditor = false;

    this.packages = packagesModel(this);
    this.contentSearch = contentSearchModel(this);
    this.content = contentModel(this);
    this.dragging = draggingModel(this);
  }

  componentDidMount() {
    this.contentSearch.search();
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.content.cacheRequiresUpdate(prevState, this.state)) {
      this.content.updateCache(this.state);
    }
  }

  onDragEnter = (e) => {
    // TOTALLY LEGIT HACK!! react-dnd won't tell you when you drag outside of something
    // so we work it out by listening to all dragEnter events in the entire app
    const before = this.state[StateKeys.DRAGGING].overPackageEditor;
    const after = !!e.target.closest("#packageEditor");

    if(before !== after) {
      this.dragging.setOverPackageEditor(after);
    }
  }

  render() {
    const cache = this.state[StateKeys.CONTENT];
    const editor = this.state[StateKeys.EDITOR];
    const dragging = this.state[StateKeys.DRAGGING];

    const contentSearch = this.state[StateKeys.CONTENT_SEARCH];
    const packageSearch = this.state[StateKeys.PACKAGE_SEARCH];

    const contentResults = this.content.enrichFromCache(cache, contentSearch.results);
    
    let thePackage = editor.thePackage;
    if(thePackage) {
      const editorResults = this.content.enrichFromCache(cache, thePackage.content);
      thePackage = Object.assign({}, editor.thePackage, { content: editorResults });
    }

    return <BrowserRouter>
        <div onDragEnter={this.onDragEnter}>
          <Container fluid>
          {/* Semantic UI Grid has 16 divisions */}
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={5}>
                <ContentSearch
                  loading={contentSearch.loading}
                  results={contentResults}
                  onDragStart={this.dragging.startDrag(false)} // not initially over package editor
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
              <Route
                path="/packages/:id"
                render={({ match }) => {
                  return <PackagePanel
                    packageId={match.params.id}
                    size={PACKAGE_SIZE}
                    loading={editor.loading}
                    thePackage={thePackage}
                    onDragStart={this.dragging.startDrag(true)} // initially over package editor
                    onChange={this.packages.updatePackage}
                    setPackage={this.packages.setPackage}
                    {...dragging}
                  />;
                }}
              />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </BrowserRouter>;
  }
}

export default DragDropContext(HTML5Backend)(App);
