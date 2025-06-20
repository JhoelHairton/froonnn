import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';



export interface TreeNode {
  id: string;
  name: string;
  type: 'category' | 'subcategory' | 'service';
  parentId?: string;
  children: TreeNode[];
  isEditing?: boolean;
  isCreating?: boolean;
  serviceData?: ServiceData;
}

export interface ServiceData {
  name: string;
  price: number;
  duration: number;
  hidePrice: boolean;
  recurring: boolean;
  capacity?: number;
  description?: string;
  enableDeposit: boolean;
  bufferBefore?: number;
  bufferAfter?: number;
  hideDuration: boolean;
  itinerary: string[];
  extraServices: string[];
  paymentMethods: string[];
  image?: string;
}

@Component({
  selector: 'app-experiencias-pendientes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './experiencias-pendientes.component.html',
  styleUrl: './experiencias-pendientes.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // ✅ AQUÍ está la clave
  
})
export class ExperienciasPendientesComponent  {

 treeData: TreeNode[] = [];
  showChildOptions: { [key: string]: boolean } = {};
  showServiceModal = false;
  currentServiceParent: TreeNode | null = null;
  serviceForm: FormGroup;
  currentPhase = 0;
  phases = ['Datos Básicos', 'Itinerario', 'Servicios Extra', 'Métodos de Pago'];
  
  // Datos para las fases del formulario
  itinerarySteps: string[] = [''];
  extraServices: string[] = [''];
  availablePaymentMethods = ['Efectivo', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'PayPal', 'Transferencia Bancaria'];
  selectedPaymentMethods: string[] = [];
  
  newNodeName = '';
  newChildName = '';

  constructor(private fb: FormBuilder) {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      capacity: [''],
      description: [''],
      bufferBefore: [''],
      bufferAfter: [''],
      hidePrice: [false],
      recurring: [false],
      enableDeposit: [false],
      hideDuration: [false]
    });
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  addRootCategory(): void {
    const newCategory: TreeNode = {
      id: this.generateId(),
      name: '',
      type: 'category',
      children: [],
      isCreating: true
    };
    this.treeData.push(newCategory);
  }

  showAddChildOptions(node: TreeNode): void {
    this.showChildOptions[node.id] = true;
  }

  hideAddChildOptions(node: TreeNode): void {
    this.showChildOptions[node.id] = false;
  }

  addSubcategory(parent: TreeNode): void {
    const newSubcategory: TreeNode = {
      id: this.generateId(),
      name: '',
      type: 'subcategory',
      parentId: parent.id,
      children: [],
      isCreating: true
    };
    parent.children.push(newSubcategory);
    this.hideAddChildOptions(parent);
  }

  addService(parent: TreeNode): void {
    this.currentServiceParent = parent;
    this.showServiceModal = true;
    this.resetServiceForm();
    this.hideAddChildOptions(parent);
  }

  confirmCreate(node: TreeNode, name: string): void {
    if (name.trim()) {
      node.name = name.trim();
      node.isCreating = false;
      this.newNodeName = '';
      this.newChildName = '';
    }
  }

  cancelCreate(node: TreeNode): void {
    if (node.parentId) {
      const parent = this.findNodeById(node.parentId);
      if (parent) {
        const index = parent.children.findIndex(child => child.id === node.id);
        if (index > -1) {
          parent.children.splice(index, 1);
        }
      }
    } else {
      const index = this.treeData.findIndex(n => n.id === node.id);
      if (index > -1) {
        this.treeData.splice(index, 1);
      }
    }
    this.newNodeName = '';
    this.newChildName = '';
  }

  editNode(node: TreeNode): void {
    if (node.type === 'service') {
      // Para servicios, abrir el modal de edición
      this.currentServiceParent = this.findParentNode(node);
      this.loadServiceData(node);
      this.showServiceModal = true;
    } else {
      // Para categorías y subcategorías, edición inline
      node.isEditing = true;
    }
  }

  confirmEdit(node: TreeNode, name: string): void {
    if (name.trim()) {
      node.name = name.trim();
      node.isEditing = false;
    }
  }

  cancelEdit(node: TreeNode): void {
    node.isEditing = false;
  }

  deleteNode(node: TreeNode): void {
    if (confirm(`¿Estás seguro de que quieres eliminar "${node.name}"?`)) {
      if (node.parentId) {
        const parent = this.findNodeById(node.parentId);
        if (parent) {
          const index = parent.children.findIndex(child => child.id === node.id);
          if (index > -1) {
            parent.children.splice(index, 1);
          }
        }
      } else {
        const index = this.treeData.findIndex(n => n.id === node.id);
        if (index > -1) {
          this.treeData.splice(index, 1);
        }
      }
    }
  }

  findNodeById(id: string): TreeNode | null {
    const search = (nodes: TreeNode[]): TreeNode | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        const found = search(node.children);
        if (found) return found;
      }
      return null;
    };
    return search(this.treeData);
  }

  findParentNode(targetNode: TreeNode): TreeNode | null {
    const search = (nodes: TreeNode[], parent: TreeNode | null = null): TreeNode | null => {
      for (const node of nodes) {
        if (node.id === targetNode.id) return parent;
        const found = search(node.children, node);
        if (found) return found;
      }
      return null;
    };
    return search(this.treeData);
  }

  getNodeClass(node: TreeNode): string {
    const baseClasses = 'border-2 ';
    switch (node.type) {
      case 'category':
        return baseClasses + 'border-gray-400 bg-gray-100';
      case 'subcategory':
        return baseClasses + 'border-blue-400 bg-blue-100';
      case 'service':
        return baseClasses + 'border-white bg-white shadow-md';
      default:
        return baseClasses + 'border-gray-300 bg-white';
    }
  }

  // Métodos para el modal de servicio
  closeServiceModal(): void {
    this.showServiceModal = false;
    this.currentServiceParent = null;
    this.resetServiceForm();
  }

  resetServiceForm(): void {
    this.serviceForm.reset();
    this.currentPhase = 0;
    this.itinerarySteps = [''];
    this.extraServices = [''];
    this.selectedPaymentMethods = [];
  }

  loadServiceData(serviceNode: TreeNode): void {
    if (serviceNode.serviceData) {
      this.serviceForm.patchValue({
        name: serviceNode.name,
        price: serviceNode.serviceData.price,
        duration: serviceNode.serviceData.duration,
        capacity: serviceNode.serviceData.capacity,
        description: serviceNode.serviceData.description,
        bufferBefore: serviceNode.serviceData.bufferBefore,
        bufferAfter: serviceNode.serviceData.bufferAfter,
        hidePrice: serviceNode.serviceData.hidePrice,
        recurring: serviceNode.serviceData.recurring,
        enableDeposit: serviceNode.serviceData.enableDeposit,
        hideDuration: serviceNode.serviceData.hideDuration
      });
      
      this.itinerarySteps = serviceNode.serviceData.itinerary.length > 0 ? 
        [...serviceNode.serviceData.itinerary] : [''];
      this.extraServices = serviceNode.serviceData.extraServices.length > 0 ? 
        [...serviceNode.serviceData.extraServices] : [''];
      this.selectedPaymentMethods = [...serviceNode.serviceData.paymentMethods];
    }
  }

  nextPhase(): void {
    if (this.currentPhase < 3) {
      this.currentPhase++;
    }
  }

  prevPhase(): void {
    if (this.currentPhase > 0) {
      this.currentPhase--;
    }
  }

  // Métodos para el itinerario
  addItineraryStep(): void {
    this.itinerarySteps.push('');
  }

  removeItineraryStep(index: number): void {
    if (this.itinerarySteps.length > 1) {
      this.itinerarySteps.splice(index, 1);
    }
  }

  // Métodos para servicios extra
  addExtraService(): void {
    this.extraServices.push('');
  }

  removeExtraService(index: number): void {
    if (this.extraServices.length > 1) {
      this.extraServices.splice(index, 1);
    }
  }

  // Métodos para métodos de pago
  togglePaymentMethod(method: string): void {
    const index = this.selectedPaymentMethods.indexOf(method);
    if (index > -1) {
      this.selectedPaymentMethods.splice(index, 1);
    } else {
      this.selectedPaymentMethods.push(method);
    }
  }

  createService(): void {
    if (this.serviceForm.valid && this.currentServiceParent) {
      const formValue = this.serviceForm.value;
      
      const serviceData: ServiceData = {
        name: formValue.name,
        price: formValue.price,
        duration: formValue.duration,
        hidePrice: formValue.hidePrice || false,
        recurring: formValue.recurring || false,
        capacity: formValue.capacity,
        description: formValue.description,
        enableDeposit: formValue.enableDeposit || false,
        bufferBefore: formValue.bufferBefore,
        bufferAfter: formValue.bufferAfter,
        hideDuration: formValue.hideDuration || false,
        itinerary: this.itinerarySteps.filter(step => step.trim() !== ''),
        extraServices: this.extraServices.filter(service => service.trim() !== ''),
        paymentMethods: [...this.selectedPaymentMethods],
        image: undefined // Se puede agregar funcionalidad de imagen más tarde
      };

      const newService: TreeNode = {
        id: this.generateId(),
        name: formValue.name,
        type: 'service',
        parentId: this.currentServiceParent.id,
        children: [],
        serviceData: serviceData
      };

      this.currentServiceParent.children.push(newService);
      this.closeServiceModal();
    }
  }

}
