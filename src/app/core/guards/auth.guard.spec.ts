import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

function prepareTestBed(isLoggedIn: boolean) {
  const authServiceSpy = {
    isLoggedIn: {
      getValue: () => isLoggedIn
    }
  };

  const mockNavigate = jest.fn();
  const routerSpy = {
    navigate: mockNavigate
  };

  TestBed.configureTestingModule({
    providers: [
      AuthGuard,
      { provide: AuthService, useValue: authServiceSpy },
      { provide: Router, useValue: routerSpy }
    ]
  });

  return mockNavigate;
}

describe('AuthService', () => {
  let mockNavigate;

  beforeEach(() => {});

  it('should be created', () => {
    mockNavigate = prepareTestBed(true);
    const service: AuthGuard = TestBed.get(AuthGuard);
    expect(service).toBeTruthy();
  });

  it('should allow navigation if user is logged in', () => {
    mockNavigate = prepareTestBed(true);
    const service: AuthGuard = TestBed.get(AuthGuard);
    expect(service.canActivate()).toBe(true);
  });

  it('should deny navigation if user is not logged in', () => {
    mockNavigate = prepareTestBed(false);
    const service: AuthGuard = TestBed.get(AuthGuard);
    expect(service.canActivate()).toBe(false);
  });

  it('should redirect to login if user is not logged in', () => {
    mockNavigate = prepareTestBed(false);
    const service: AuthGuard = TestBed.get(AuthGuard);
    service.canActivate();
    expect(mockNavigate.mock.calls.length).toBe(1);
    expect(mockNavigate.mock.calls[0][0][0]).toBe('/login');
  });
});
