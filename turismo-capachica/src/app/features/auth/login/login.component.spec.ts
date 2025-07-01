import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/services/auth.service';
import { CheckoutPayload, ReservaService } from '../../../core/services/reserva.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { Directive, Input } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@Directive({
    selector: '[routerLink]',
    standalone: true // ✅ importante para standalone
})
class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let reservaServiceSpy: jasmine.SpyObj<ReservaService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let toastrSpy: jasmine.SpyObj<ToastrService>;
    let activatedRouteStub: any;

    beforeEach(async () => {
        authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'saveSession']);
        reservaServiceSpy = jasmine.createSpyObj('ReservaService', ['checkout']);
        routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
        toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);
        activatedRouteStub = {
            snapshot: {
                queryParams: {}
            }
        };

        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([]),
                LoginComponent,
                RouterLinkStubDirective // ✅ Mueve aquí y asegúrate de no incluirlo en "declarations"
            ],

            providers: [
                { provide: AuthService, useValue: authServiceSpy },
                { provide: ReservaService, useValue: reservaServiceSpy },
                { provide: Router, useValue: routerSpy },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: ToastrService, useValue: toastrSpy },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]


        }).compileComponents();

    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        localStorage.clear();
    });

    it('debería crear el componente', () => {
        expect(component).toBeTruthy();
    });

    it('no debe enviar si el formulario es inválido', () => {
        component.form.setValue({ email: '', password: '' });
        component.onSubmit();
        expect(authServiceSpy.login).not.toHaveBeenCalled();
    });

    it('debe hacer login y navegar según rol TURISTA sin carrito', () => {
        const usuario = { rol: 'turista', id: 1, nombre: 'Ana', email: 'ana@correo.com' };
        const fakeResponse = { token: 'abc123', usuario };

        component.form.setValue({ email: 'ana@correo.com', password: '123456' });
        authServiceSpy.login.and.returnValue(of(fakeResponse));

        component.onSubmit();

        expect(authServiceSpy.login).toHaveBeenCalled();
        expect(authServiceSpy.saveSession).toHaveBeenCalledWith(fakeResponse);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/turista/inicio']);
    });

    it('debe hacer login y navegar a returnUrl si existe', () => {
        activatedRouteStub.snapshot.queryParams['returnUrl'] = '/carrito';
        const fakeUser = { rol: 'turista', id: 1, nombre: 'Ana', email: 'ana@correo.com' };
        const response = { token: 'abc123', usuario: fakeUser };

        component.form.setValue({ email: 'test@x.com', password: '123' });
        authServiceSpy.login.and.returnValue(of(response));

        component.onSubmit();

        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/carrito');
    });

    it('debe redirigir según empresa aprobada (emprendedor)', () => {
        const empresa = { status: 'aprobada' };
        const user = { rol: 'emprendedor', empresa };
        const response = { token: 'x', usuario: user };

        component.form.setValue({ email: 'e@correo.com', password: 'x' });
        authServiceSpy.login.and.returnValue(of(response));

        component.onSubmit();

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/empresa/dashboard']);
    });

    it('debe mostrar alerta si empresa está pendiente (emprendedor)', () => {
        const empresa = { status: 'pendiente' };
        const user = { rol: 'emprendedor', empresa };
        const response = { token: 'x', usuario: user };

        spyOn(Swal, 'fire');

        component.form.setValue({ email: 'e@correo.com', password: 'x' });
        authServiceSpy.login.and.returnValue(of(response));

        component.onSubmit();

        expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({
            icon: 'info',
            title: '⏳ Empresa en revisión'
        }));
    });

    it('debe ejecutar checkout si hay carrito pendiente y rol TURISTA', () => {
        const carrito: CheckoutPayload = {
            reservation_date: '2025-07-01',
            cart: [{ id: 1, type: 'servicio', quantity: 2 }]
        };
        localStorage.setItem('carritoPendiente', JSON.stringify(carrito));

        const user = { rol: 'turista', id: 2, nombre: 'Luis', email: 'luis@correo.com' };
        const response = { token: 't', usuario: user };

        component.form.setValue({ email: 'luis@correo.com', password: 'xxx' });
        authServiceSpy.login.and.returnValue(of(response));
        reservaServiceSpy.checkout.and.returnValue(of({ success: true }));

        component.onSubmit();

        expect(reservaServiceSpy.checkout).toHaveBeenCalledWith(carrito);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/turista/reservas']);
    });


    it('debe mostrar mensaje de error si login falla', () => {
        component.form.setValue({ email: 'error@correo.com', password: 'fail' });
        authServiceSpy.login.and.returnValue(throwError(() => ({
            error: { message: 'Credenciales incorrectas' }
        })));

        component.onSubmit();

        expect(toastrSpy.error).toHaveBeenCalledWith(
            'Verifica tu correo y contraseña e intenta nuevamente.',
            '❌ Credenciales incorrectas',
            jasmine.any(Object)
        );
    });

});
