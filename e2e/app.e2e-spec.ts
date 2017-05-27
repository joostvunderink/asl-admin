import { AslAdminPage } from './app.po';

describe('asl-admin App', () => {
  let page: AslAdminPage;

  beforeEach(() => {
    page = new AslAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
