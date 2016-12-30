import { browser, element, by } from 'protractor';

export class SamplePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('dev-root h1')).getText();
  }
}
