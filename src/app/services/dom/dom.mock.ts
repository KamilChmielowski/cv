export class DomMock {
  static get getService() {
    return jasmine.createSpyObj('WindowService', ['getWindow' , 'isDesktop', 'remToPixels']);
  }

  static init(serviceMock: any, scrollY: number, remToPixels: number): void {
    serviceMock.getWindow.and.returnValue({
      scrollY: scrollY,
      matchMedia: () => ({ matches: true })
    });
    serviceMock.isDesktop.and.returnValue(true);
    serviceMock.remToPixels.and.returnValue(remToPixels);
  }
}
