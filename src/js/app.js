import './../scss/main.scss';
import { initializeSearch } from './modules/search';
import { multiEventBinders } from './modules/multi';
import { unitEventBinders } from './modules/unit';

initializeSearch();
multiEventBinders();
unitEventBinders();
