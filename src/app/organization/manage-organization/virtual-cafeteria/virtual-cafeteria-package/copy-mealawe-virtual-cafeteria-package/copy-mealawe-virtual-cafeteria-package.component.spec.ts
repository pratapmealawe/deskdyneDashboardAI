import { CopyMealaweVirtualCafeteriaPackageComponent } from './copy-mealawe-virtual-cafeteria-package.component';

describe('CopyMealaweVirtualCafeteriaPackageComponent', () => {
  let component: CopyMealaweVirtualCafeteriaPackageComponent;
  let fixture: ComponentFixture<CopyMealaweVirtualCafeteriaPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CopyMealaweVirtualCafeteriaPackageComponent]
    });
    fixture = TestBed.createComponent(CopyMealaweVirtualCafeteriaPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
