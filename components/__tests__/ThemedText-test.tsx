import * as React from 'react';
import renderer from 'react-test-renderer';
import NativeText from '../ui/native-text';


it(`renders correctly`, () => {
  const tree = renderer.create(<NativeText>Snapshot test!</NativeText>).toJSON();

  expect(tree).toMatchSnapshot();
});
