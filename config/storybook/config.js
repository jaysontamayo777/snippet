import { configure } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';

function loadStories() {
  require('../src/stories/Button');
  require('../src/stories/PartnerSection');
}

configure(loadStories, module);
