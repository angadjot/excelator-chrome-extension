import React from 'react';
import CoolTabs from 'react-cool-tabs';
import StyledDropzone from "./Dropzone";
import {Constants} from "../Constants";

class Tabs extends React.Component {

  render() {

    const baseStyle = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      borderColor: '#ffffff',
      backgroundColor: '#282c34',
      color: '#eeeeee',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      minHeight: '75vh',
      minWidth: '75vw',
    };

    return (
      <div>
        <CoolTabs
          tabKey={'1'}
          style={baseStyle}
          activeTabStyle={{background: '#282c34', color: 'white'}}
          unActiveTabStyle={{background: 'white', color: 'black'}}
          activeLeftTabBorderBottomStyle={{background: '#282c34', height: 4}}
          activeRightTabBorderBottomStyle={{background: '#282c34', height: 4}}
          leftTabTitle={'Excel To Json'}
          rightTabTitle={'Json To Excel'}
          leftContent={<StyledDropzone conversion={Constants.EXCEL_TO_JSON}/>}
          rightContent={<StyledDropzone conversion={Constants.JSON_TO_EXCEL}/>}
          contentTransitionStyle={'transform 0.6s ease-in'}
          borderTransitionStyle={'all 0.6s ease-in'}/>
      </div>
    );
  }
}

export default Tabs;