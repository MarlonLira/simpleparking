import { MaterialDashboardAngularPage } from './app.po';

describe('simple-parking App', () => {
  let page: MaterialDashboardAngularPage;

  beforeEach(() => {
    page = new MaterialDashboardAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.navigateTo()).toEqual('');
  });
});
