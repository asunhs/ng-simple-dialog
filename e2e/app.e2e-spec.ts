import { DialogTestPage } from './app.po';

describe('dialog-test App', () => {
  let page: DialogTestPage;

  beforeEach(() => {
    page = new DialogTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('dl works!');
  });
});
