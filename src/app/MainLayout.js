import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import MultiSelectField from './components/pages/components/MultiSelectField/Page';

import './MainLayout.css';

class MainLayout extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <AppBar title="MaterialUI MultiSelect" />
        </header>
        <section className="main">
          <MultiSelectField />
        </section>
      </div>
    );
  }
}

export default MainLayout;
