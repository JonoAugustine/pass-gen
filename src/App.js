import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Content from './components/Content'
import Project from './components/Project/Project'

class App extends React.Component {

  render() {
    return ( 
      <div className = "root-app" >
        <Content child={<Project />}/>
      </div>
    );
  }
}

export default App;