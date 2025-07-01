import { TestBed } from '@angular/core/testing';
import { AuthService } from '../app/core/services/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import jwt from 'jwt-decode';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockToken = 'mocked.jwt.token';
  const mockUser = {
    id: 1,
    nombre: 'Juan',
    email: 'juan@correo.com',
    rol: 'turista'
  };

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('debería llamar al endpoint de login correctamente', () => {
    const credentials = { email: 'a@a.com', password: '123' };

    service.login(credentials).subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
  });

  it('debería guardar token y usuario con saveSession()', () => {
    const data = { token: mockToken, usuario: mockUser };

    service.saveSession(data);

    expect(localStorage.getItem('token')).toBe(mockToken);
    const storedUser = JSON.parse(localStorage.getItem('user')!);
    expect(storedUser.nombre).toBe('Juan');
    expect(storedUser.rol).toBe('turista');
  });

  it('debería retornar el token desde localStorage', () => {
    localStorage.setItem('token', mockToken);
    expect(service.getToken()).toBe(mockToken);
  });

  it('debería setear un token con setToken()', () => {
    service.setToken('nuevo.token');
    expect(localStorage.getItem('token')).toBe('nuevo.token');
  });

  it('debería retornar el usuario con getUser()', () => {
    localStorage.setItem('user', JSON.stringify(mockUser));
    const user = service.getUser();
    expect(user?.email).toBe('juan@correo.com');
  });

  it('debería retornar true si está logueado', () => {
    localStorage.setItem('token', 'algo');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('debería retornar false si no hay token', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('debería limpiar storage y redirigir con logout()', () => {
    localStorage.setItem('token', 'x');
    localStorage.setItem('carritoPendiente', 'y');
    localStorage.setItem('user', 'z');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('carritoPendiente')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('debería detectar token expirado', () => {
    const token = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })) + '.' +
                  btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 10 })) + '.signature';
    localStorage.setItem('token', token);
    expect(service.isTokenExpired()).toBeTrue();
  });

  it('debería detectar token válido', () => {
    const token = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })) + '.' +
                  btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 })) + '.signature';
    localStorage.setItem('token', token);
    expect(service.isTokenExpired()).toBeFalse();
  });

});
