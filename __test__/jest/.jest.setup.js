import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from "jest-fetch-mock";

const config = require('../../config');
configure({ adapter: new Adapter() });


global.__CONFIG__ = config.frontend.app;

global.fetch = fetchMock;
