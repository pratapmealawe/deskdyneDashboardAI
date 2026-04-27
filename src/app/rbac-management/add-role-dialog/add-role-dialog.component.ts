import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ApiMainService } from '@service/apiService/apiMain.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';

/**
 * Node for permission tree
 */
interface PermissionNode {
  name: string;
  id?: string;
  resource?: string;
  action?: string;
  children?: PermissionNode[];
}

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id?: string;
  resource?: string;
  action?: string;
}

@Component({
  selector: 'app-add-role-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatDialogModule, MatTreeModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.scss']
})
export class AddRoleDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private apiMainService = inject(ApiMainService);

  roleForm: FormGroup;
  allPermissions: any[] = [];
  
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<FlatNode, PermissionNode>();

  /** Map from nested node to flattened node. This helps us finding the flattened node for selection */
  nestedNodeMap = new Map<PermissionNode, FlatNode>();

  treeControl: FlatTreeControl<FlatNode>;
  treeFlattener: MatTreeFlattener<PermissionNode, FlatNode>;
  dataSource: MatTreeFlatDataSource<PermissionNode, FlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<FlatNode>(true /* multiple */);

  constructor(
    public dialogRef: MatDialogRef<AddRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.roleForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      description: [data?.description || '']
    });

    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  ngOnInit(): void {
    this.loadPermissions();
  }

  getLevel = (node: FlatNode) => node.level;
  isExpandable = (node: FlatNode) => node.expandable;
  getChildren = (node: PermissionNode): PermissionNode[] => node.children || [];
  hasChild = (_: number, _nodeData: FlatNode) => _nodeData.expandable;

  transformer = (node: PermissionNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
      ? existingNode
      : {} as FlatNode;
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.id = node.id;
    flatNode.resource = node.resource;
    flatNode.action = node.action;
    flatNode.expandable = !!node.children && node.children.length > 0;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  async loadPermissions() {
    try {
      this.allPermissions = await this.apiMainService.getAllPermissions() as any[];
      const treeData = this.buildPermissionTree(this.allPermissions);
      this.dataSource.data = treeData;

      // Expand all nodes by default
      this.treeControl.expandAll();

      // Set initial selection
      if (this.data && this.data.permissions) {
        const selectedIds = this.data.permissions.map((p: any) => typeof p === 'string' ? p : p._id);
        this.restoreSelection(selectedIds);
      }
    } catch (error) {
      console.error('Error loading permissions:', error);
    }
  }

  buildPermissionTree(permissions: any[]): PermissionNode[] {
    const resourceMap = new Map<string, PermissionNode>();

    permissions.forEach(p => {
      if (!resourceMap.has(p.resource)) {
        resourceMap.set(p.resource, {
          name: p.resource,
          children: []
        });
      }
      const resourceNode = resourceMap.get(p.resource)!;
      resourceNode.children!.push({
        name: p.action,
        id: p._id,
        resource: p.resource,
        action: p.action
      });
    });

    return Array.from(resourceMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  restoreSelection(selectedIds: string[]) {
    this.treeControl.dataNodes.forEach(node => {
      if (node.id && selectedIds.includes(node.id)) {
        this.checklistSelection.select(node);
      }
    });

    // Update parent states
    this.treeControl.dataNodes
      .filter(node => node.expandable)
      .forEach(node => this.checkAllParentsSelection(node));
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: FlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: FlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the item selection. Select/deselect all the descendants node */
  itemSelectionToggle(node: FlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force check for the parent for each descendant
    descendants.forEach(child => this.checkAllParentsSelection(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf item selection. Check all the parents to see if they changed */
  leafItemSelectionToggle(node: FlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: FlatNode): void {
    let parent: FlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootState(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootState(node: FlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: FlatNode): FlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  async saveRole() {
    // Collect all selected leaf nodes (actual permissions)
    const selectedPermissionIds = this.checklistSelection.selected
      .filter(node => !node.expandable && node.id)
      .map(node => node.id!);

    const roleData = {
      ...this.roleForm.value,
      permissions: selectedPermissionIds
    };

    try {
      if (this.data && this.data._id) {
        await this.apiMainService.updateRole(this.data._id, roleData);
      } else {
        await this.apiMainService.addRole(roleData);
      }
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Error saving role:', error);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
