import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
// import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import multiSelectFieldReadmeText from '!raw!./README';
import MultiSelectFieldExampleSimple from './ExampleSimple';
import multiSelectFieldExampleSimpleCode from '!raw!./ExampleSimple';
// import multiSelectFieldCode from '!raw!../../../../../components/MultiSelectField';

const MultiSelectFieldPage = () => (
  <div>
    <Title render="MultiSelect Field" />
    <MarkdownElement text={multiSelectFieldReadmeText} />
    <CodeExample
      title="Simple examples"
      code={multiSelectFieldExampleSimpleCode}
    >
      <MultiSelectFieldExampleSimple />
    </CodeExample>
    {/* <PropTypeDescription code={multiSelectFieldCode} /> */}
  </div>
);

export default MultiSelectFieldPage;
